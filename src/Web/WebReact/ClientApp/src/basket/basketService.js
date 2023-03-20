import { Router } from '@angular/router';

import { DataService } from '../services/dataService';
import { SecurityService } from '../services/securityService';
import { BasketWrapperService } from '../services/basketWrapperService';
import { ConfigurationService } from '../services/configurationService';
import { StorageService } from '../services/storageService';

import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export class BasketService {
    basketUrl= '';
    purchaseUrl= '';
    basket= {
        buyerId: '',
        items: []
    };
    service=new DataService()
    authService=new SecurityService()
    basketWrapperService=new BasketWrapperService()
    router=new Router()
    configurationService=new ConfigurationService()
    storageService=new StorageService()

    //observable that is fired when item is removed from basket
    basketUpdateSource = new Subject();
    basketUpdate$ = this.basketUpdateSource.asObservable();

    constructor() {
        this.basket.items = [];

        // Init:
        if (this.authService.IsAuthorized) {
            if (this.authService.UserData) {
                this.basket.buyerId = this.authService.UserData.sub;
                if (this.configurationService.isReady) {
                    this.basketUrl = this.configurationService.serverSettings.purchaseUrl;
                    this.purchaseUrl = this.configurationService.serverSettings.purchaseUrl;
                    this.loadData();
                }
                else {
                    this.configurationService.settingsLoaded$.subscribe(x => {
                        this.basketUrl = this.configurationService.serverSettings.purchaseUrl;
                        this.purchaseUrl = this.configurationService.serverSettings.purchaseUrl;
                        this.loadData();
                    });
                }
            }
        }

        this.basketWrapperService.orderCreated$.subscribe(x => {
            this.dropBasket();
        });
    }

    addItemToBasket(item) {
        let basketItem = this.basket.items.find(value => value.productId === item.productId);

        if (basketItem) {
            basketItem.quantity++;
        } else {
            this.basket.items.push(item);
        }

        return this.setBasket(this.basket);
    }

    setBasket(basket){
        let url = this.purchaseUrl + '/b/api/v1/basket/';

        this.basket = basket;

        return this.service.post(url, basket).pipe(tap((response) => true));
    }

    setBasketCheckout(basketCheckout){
        let url = this.basketUrl + '/b/api/v1/basket/checkout';

        return this.service.postWithId(url, basketCheckout).pipe(tap((response) => {
            this.basketWrapperService.orderCreated();
            return true;
        }));
    }

    getBasket() {
        let url = this.basketUrl + '/b/api/v1/basket/' + this.basket.buyerId;

        return this.service.get(url).pipe(tap((response) => {
            if (response.status === 204) {
                return null;
            }

            return response;
        }));
    }

    mapBasketInfoCheckout(order) {
        let basketCheckout = {};

        basketCheckout.street = order.street
        basketCheckout.city = order.city;
        basketCheckout.country = order.country;
        basketCheckout.state = order.state;
        basketCheckout.zipcode = order.zipcode;
        basketCheckout.cardexpiration = order.cardexpiration;
        basketCheckout.cardnumber = order.cardnumber;
        basketCheckout.cardsecuritynumber = order.cardsecuritynumber;
        basketCheckout.cardtypeid = order.cardtypeid;
        basketCheckout.cardholdername = order.cardholdername;
        basketCheckout.total = 0;
        basketCheckout.expiration = order.expiration;

        return basketCheckout;
    }

    updateQuantity() {
        this.basketUpdateSource.next();
    }

    dropBasket() {
        this.basket.items = [];
        this.setBasket(this.basket).subscribe(res => {
            this.basketUpdateSource.next();
        });
    }

    loadData() {
        this.getBasket().subscribe(basket => {
            if (basket != null)
                this.basket.items = basket.items;
        });
    }
}