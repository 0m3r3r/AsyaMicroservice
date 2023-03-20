export  class BasketItem{
    constructor(id,productId,productName,unitPrice,oldUnitPrice,quantity,pictureUrl){
        this.id=id
        this.productId=productId
        this.productName=productName
        this.unitPrice=unitPrice
        this.oldUnitPrice=oldUnitPrice
        this.quantity=quantity
        this.pictureUrl=pictureUrl
    }
}