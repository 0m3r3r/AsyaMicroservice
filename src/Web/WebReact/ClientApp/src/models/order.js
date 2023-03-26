export class Order{
    constructor(id,orderNumber,createByUserId,customerId,representativeId,isConfirmByAccounting,isConfirmByGraphic,recordDate,updateDate,deadline,deliveryId,status){
        this.id=id
        this.orderNumber=orderNumber
        this.createByUserId=createByUserId
        this.customerId=customerId
        this.representativeId=representativeId
        this.isConfirmByAccounting=isConfirmByAccounting
        this.isConfirmByGraphic=isConfirmByGraphic
        this.recordDate=recordDate
        this.updateDate=updateDate
        this.deadline=deadline
        this.deliveryId=deliveryId
        this.status=status
    }
}