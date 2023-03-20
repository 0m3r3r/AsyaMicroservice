export class BasketCheckout {
  constructor(
    city,
    street,
    state,
    country,
    zipcode,
    cardnumber,
    cardexpiration,
    expiration,
    cardsecuritynumber,
    cardholdername,
    cardtypeid,
    buyer,
    ordernumber,
    total
  ) {
    this.city = city;
    this.street = street;
    this.state = state;
    this.country = country;
    this.zipcode = zipcode;
    this.cardnumber = cardnumber;
    this.cardexpiration = cardexpiration;
    this.expiration = expiration;
    this.cardsecuritynumber = cardsecuritynumber;
    this.cardholdername = cardholdername;
    this.cardtypeid = cardtypeid;
    this.buyer = buyer;
    this.ordernumber = ordernumber;
    this.total = total;
  }
}
