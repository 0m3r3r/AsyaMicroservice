import { Subject }          from 'rxjs';
import { Basket }          from '../models/basket';
import { SecurityService } from '../services/securityService';
import { Guid } from '../guid';


export class BasketWrapperService {

    basket= new Basket();
    identityService= new SecurityService()
    
    // observable that is fired when a product is added to the cart
    addItemToBasketSource = new Subject();
    addItemToBasket$ = this.addItemToBasketSource.asObservable();

    orderCreatedSource = new Subject();
    orderCreated$ = this.orderCreatedSource.asObservable();

    addItemToBasket(item) {  //CatalogItem
        if (this.identityService.IsAuthorized) {
            let basketItem = {   //BasketItem
                pictureUrl: item.pictureUri,
                productId: item.id,
                productName: item.name,
                quantity: 1,
                unitPrice: item.price,
                id:Guid.newGuid,
                oldUnitPrice: 0
            };

            this.addItemToBasketSource.next(basketItem);
        } else {
            this.identityService.Authorize();
        }
    }

    orderCreated() {
        this.orderCreatedSource.next();
    }
}
