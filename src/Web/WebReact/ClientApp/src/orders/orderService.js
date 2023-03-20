import { DataService } from '..//services/dataService';
import { SecurityService } from '../services/securityService';
import { ConfigurationService } from '../services/configurationService';
import { BasketWrapperService } from '../services/basketWrapperService';
import { tap} from 'rxjs/operators';


export class OrdersService {
    ordersUrl = '';
    service=new DataService()
    basketService=new BasketWrapperService() 
    identityService=new SecurityService()
    configurationService=new ConfigurationService()
    
    
    constructor() {
        if (this.configurationService.isReady)
            this.ordersUrl = this.configurationService.serverSettings.purchaseUrl;
        else
            this.configurationService.settingsLoaded$.subscribe(x => this.ordersUrl = this.configurationService.serverSettings.purchaseUrl);

    }

    getOrders() {
        let url = this.ordersUrl + '/o/api/v1/orders';

        return this.service.get(url).pipe(tap((response) => {
            return response;
        }));
    }

    cancelOrder(orderNumber) {
        let url = this.ordersUrl + '/o/api/v1/orders/cancel';
        let data = { OrderNumber: orderNumber };

        return this.service.putWithId(url, data).pipe(tap(() => {
            return;
        }));
    }

    getOrder(id) {
        let url = this.ordersUrl + '/o/api/v1/orders/' + id;

        return this.service.get(url).pipe(tap((response) => {
            return response;
        }));
    }

    mapOrderAndIdentityInfoNewOrder() {
        let order ={};
        let basket = this.basketService.basket;
        let identityInfo = this.identityService.UserData;

        console.log(basket);
        console.log(identityInfo);

        // Identity data mapping:
        order.street = identityInfo.address_street;
        order.city = identityInfo.address_city;
        order.country = identityInfo.address_country;
        order.state = identityInfo.address_state;
        order.zipcode = identityInfo.address_zip_code;
        order.cardexpiration = identityInfo.card_expiration;
        order.cardnumber = identityInfo.card_number;
        order.cardsecuritynumber = identityInfo.card_security_number;
        order.cardtypeid = identityInfo.card_type;
        order.cardholdername = identityInfo.card_holder;
        order.total = 0;
        order.expiration = identityInfo.card_expiration;

        // basket data mapping:
        order.orderItems = [];
        basket.items.forEach(x => {
            let item= {};
            item.pictureurl = x.pictureUrl;
            item.productId =  +x.productId;
            item.productname = x.productName;
            item.unitprice = x.unitPrice;
            item.units = x.quantity;

            order.total += (item.unitprice * item.units);

            order.orderItems.push(item);
        });

        order.buyer = basket.buyerId;

        return order;
    }

}

