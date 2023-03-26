import React, { useState } from "react";
import PropTypes from "prop-types";
import s from "../../pages/tables/static/Static.module.scss";
import sa from "../../../src/components/Header/Header.module.scss";
import {
  Alert,
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import { useDispatch } from "react-redux";
import { Sparklines, SparklinesBars } from "react-sparklines";
import ItemShow from "../item/ItemShow";
import SettingsIcon from "../../components/Icons/HeaderIcons/SettingsIcon";
import SearchIcon from "../../components/Icons/HeaderIcons/SearchIcon";

export default class OrderCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        INTERNAL_REFERENCE: "",
        NUMBER: 0,
        DATE: "",
        TIME: 0,
        AUXIL_CODE: "",
        ARP_CODE: "",
        GL_CODE: "",
        TOTAL_DISCOUNTED: 0,
        TOTAL_VAT: 0,
        TOTAL_GROSS: 0,
        TOTAL_NET: 0,
        PRINT_COUNTER: 0,
        PRINT_DATE: "",
        ORDER_STATUS: 0,
        CREATED_BY: 0,
        DATE_CREATED: "",
        HOUR_CREATED: 0,
        MIN_CREATED: 0,
        SEC_CREATED: 0,
        CURRSEL_TOTAL: 0,
        DATA_REFERENCE: 0,
        TRANSACTIONS: {
          TRANSACTION: [
            {
              INTERNAL_REFERENCE: 0,
              TYPE: 0,
              MASTER_CODE: "",
              GL_CODE1: "",
              AUXIL_CODE: "",
              QUANTITY: 0,
              PRICE: 3,
              TOTAL: 0,
              VAT_RATE: 18,
              VAT_AMOUNT: 0,
              VAT_BASE: 0,
              TRANS_DESCRIPTION: "",
              UNIT_CODE: "",
              UNIT_CONV1: 0,
              UNIT_CONV2: 0,
              ORDER_RESERVE: 0,
              TOTAL_NET: 0,
              DATA_REFERENCE: 0,
              DETAILS: "",
              CAMPAIGN_INFOS: [{ CAMPAIGN_INFO: "" }],
              DEFNFLDS: "",
              MULTI_ADD_TAX: 0,
              EDT_CURR: 0,
              ORG_QUANTITY: 0,
              ORG_PRICE: 0,
              AUXIL_CODE2: "",
              RESERVE_DATE: "",
              RESERVE_AMOUNT: 0,
              GUID: "",
            },
          ],
        },
        ORGLOGOID: "",
        DEFNFLDSLIST: "",
        AFFECT_RISK: 0,
        GUID: "",
        DEDUCTIONPART1: 0,
        DEDUCTIONPART2: 0,
        LABEL_LIST: "",
      },
      item: [
        {
          INTERNAL_REFERENCE: 3827,
          CARD_TYPE: 1,
          CODE: "355070-K",
          NAME: "TERMO DERİ GÜNLÜK ÇİZGİLİ AJANDA",
          USEF_PURCHASING: 1,
          USEF_SALES: 1,
          USEF_MM: 1,
          VAT: 18,
          AUTOINCSL: 1,
          LOTS_DIVISIBLE: 1,
          UNITSET_CODE: 5,
          CREATED_BY: 3,
          DATE_CREATED: "05.10.2018",
          HOUR_CREATED: 14,
          MIN_CREATED: 59,
          SEC_CREATED: 55,
          DATA_REFERENCE: 3827,
          DIST_LOT_UNITS: 1,
          COMB_LOT_UNITS: 1,
          FACTORY_PARAMS: "",
          WH_PARAMS: "",
          CHARACTERISTICS: "",
          DOMINANT_CLASSES: "",
          UNITS: {
            UNIT: [
              {
                UNIT_CODE: "ADET",
                USEF_MTRLCLASS: 1,
                USEF_PURCHCLAS: 1,
                USEF_SALESCLAS: 1,
                CONV_FACT1: 1,
                CONV_FACT2: 1,
                DATA_REFERENCE: 3741,
                INTERNAL_REFERENCE: 3741,
                BARCODE_LIST: "",
              },
            ],
          },

          GL_LINKS: "...",
          SUPPLIERS: "...",
          EXT_ACC_FLAGS: 3,
          MULTI_ADD_TAX: 0,
          PACKET: 0,
          SELVAT: 18,
          RETURNVAT: 18,
          SELPRVAT: 18,
          RETURNPRVAT: 18,
          EXTCRD_FLAGS: 63,
          GENIUSFLDSLIST: "",
          DEFNFLDSLIST: "",
          ORGLOGOID: "",
          UPDATECHILDS: 1,
          SALE_DEDUCTION_PART1: 2,
          SALE_DEDUCTION_PART2: 3,
          PURCH_DEDUCTION_PART1: 2,
          PURCH_DEDUCTION_PART2: 3,
          ALTERNATIVES: "...",
          LABEL_LIST: "",
          GUID: "C1E9EBDD-FDE9-43CC-92D1-4A5D6B14176F",
        },
      ],
      modal: false,
      activeIndex:0,
    };

    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.doAdd = this.doAdd.bind(this);
    this.changeCustomer = this.changeCustomer.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeDeadline = this.changeDeadline.bind(this);
    this.changeItemCode = this.changeItemCode.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.changeVat = this.changeVat.bind(this);
    this.changeTotal = this.changeTotal.bind(this);
    this.changeUnit = this.changeUnit.bind(this);
    this.changeSupply = this.changeSupply.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.setProduct=this.setProduct.bind(this);
  }

  changeCustomer(event) {
    let order = this.state.order;
    order.ARP_CODE = event.target.value;
    this.setState({ [order]: order });
  }

  changeDescription(event) {
    let order = this.state.order;
    order.TRANSACTIONS.TRANSACTION[0].TRANS_DESCRIPTION = event.target.value;
    this.setState({ [order]: order });
  }

  changeDeadline(event) {
    let order = this.state.order;
    order.DATE = event.target.value;
    this.setState({ [order]: order });
  }
  changeItemCode(event, index) {
    //Get item form Logo
    // Item=logo
    let order = this.state.order;
    order.TRANSACTIONS.TRANSACTION[index].INTERNAL_REFERENCE =
      event.target.value;
    //order.TRANSACTIONS.TRANSACTION[index]=ıtem
    //this.setState(order);
    this.setState({ [order]: order });
  }
  changeQuantity(event, index) {
    let order = this.state.order;
    order.TRANSACTIONS.TRANSACTION[index].TOTAL = 0;
    order.TRANSACTIONS.TRANSACTION[index].VAT_AMOUNT = 0;

    order.TRANSACTIONS.TRANSACTION[index].QUANTITY = event.target.value;
    order.TRANSACTIONS.TRANSACTION[index].TOTAL =
      order.TRANSACTIONS.TRANSACTION[index].QUANTITY *
      order.TRANSACTIONS.TRANSACTION[index].PRICE;
    order.TRANSACTIONS.TRANSACTION[index].VAT_AMOUNT =
      (order.TRANSACTIONS.TRANSACTION[index].TOTAL *
        order.TRANSACTIONS.TRANSACTION[index].VAT_RATE) /
      100;

    this.calculateTotals(order);
  }

  calculateTotals(order) {
    order.TOTAL_VAT = 0;
    order.TOTAL_GROSS = 0;
    order.TOTAL_NET = 0;

    order.TRANSACTIONS.TRANSACTION.map((p, index) => {
      order.TOTAL_VAT =
        order.TOTAL_VAT + order.TRANSACTIONS.TRANSACTION[index].VAT_AMOUNT;
      order.TOTAL_GROSS =
        order.TOTAL_GROSS + order.TRANSACTIONS.TRANSACTION[index].TOTAL;
      order.TOTAL_NET = order.TOTAL_GROSS + order.TOTAL_VAT;
    });
    this.setState({ [order]: order });
  }

  changeVat(event, index) {
    let order = this.state.order;
    order.TRANSACTIONS.TRANSACTION[index].VAT_RATE = event.target.value;
    this.setState({ [order]: order });
  }
  changeTotal(event, index) {
    let order = this.state.order;
    order.TRANSACTIONS.TRANSACTION[index].TOTAL = event.target.value;
    this.setState({ [order]: order });
  }
  changeUnit(event, index) {
    let order = this.state.order;
    order.TRANSACTIONS.TRANSACTION[index].AUXIL_CODE = event.target.value;
    this.setState({ [order]: order });
  }
  changeSupply(event, index) {
    let order = this.state.order;
    order.TRANSACTIONS.TRANSACTION[index].AUXIL_CODE2 = event.target.value;
    this.setState({ [order]: order });
  }

  deleteProduct(e, index) {
    e.preventDefault();
    let order = this.state.order;
    order.TRANSACTIONS.TRANSACTION.splice(index, 1);
    this.setState({ [order]: order });
  }

  addProduct(e) {
    e.preventDefault();
    let order = this.state.order;

    order.TRANSACTIONS.TRANSACTION.push({
      INTERNAL_REFERENCE: 0,
      TYPE: 0,
      MASTER_CODE: "",
      GL_CODE1: "",
      AUXIL_CODE: "",
      QUANTITY: 0,
      PRICE: 0,
      TOTAL: 0,
      VAT_RATE: 0,
      VAT_AMOUNT: 0,
      VAT_BASE: 0,
      TRANS_DESCRIPTION: "",
      UNIT_CODE: "",
      UNIT_CONV1: 0,
      UNIT_CONV2: 0,
      ORDER_RESERVE: 0,
      TOTAL_NET: 0,
      DATA_REFERENCE: 0,
      DETAILS: "",
      CAMPAIGN_INFOS: [{ CAMPAIGN_INFO: "" }],
      DEFNFLDS: "",
      MULTI_ADD_TAX: 0,
      EDT_CURR: 0,
      ORG_QUANTITY: 0,
      ORG_PRICE: 0,
      AUXIL_CODE2: "",
      RESERVE_DATE: "",
      RESERVE_AMOUNT: 0,
      GUID: "",
    });

    this.setState({ [order]: order });
  }

  doAdd(e) {
    e.preventDefault();
  }

  handleModal(e,index) {
    e.preventDefault()
    
    this.setState({
      modal: !this.state.modal,
    });
    this.setState({
      activeIndex: index,
    });
  }

  setProduct(e,index) {
    e.preventDefault();
    let order = this.state.order;
    order.TRANSACTIONS.TRANSACTION[this.state.activeIndex]=this.state.item[index]
    this.setState({
      [order]: order
    })
    this.setState({
      modal:!this.state.modal,
    });
    console.log(order.TRANSACTIONS.TRANSACTION[this.state.activeIndex])
  }



  render() {
    return (
      <div>
        <form onSubmit={this.doAdd}>
          <Widget>
            <div className={`widget-table-overflow ${s.overFlow}`}>
              <Table className="table-bordered table-lg mt-lg mb-0">
                <thead>
                  <tr>
                    <th>Müşteri</th>
                    <th>Teslim Tarihi</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <div>
                        <Input
                          required
                          id="ARP_CODE"
                          name="ARP_CODE"
                          placeholder="..."
                          value={this.state.order.ARP_CODE}
                          type="text"
                          onChange={this.changeCustomer}
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <Input
                          required
                          id="DATE"
                          name="DATE"
                          placeholder="..."
                          value={this.state.order.DATE}
                          type="text"
                          onChange={this.changeDeadline}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Widget>

          <Widget>
            <Row>
              <Col>
                <h4>Ürünler</h4>
              </Col>
              <Col>
                <div className="float-right">
                  <Button
                    onClick={this.addProduct}
                    className="badge badge-success mr-2"
                  >
                    +Yeni
                  </Button>
                </div>
              </Col>
            </Row>

            <div className={`widget-table-overflow ${s.overFlow}`}>
              <Table className="table-bordered table-lg mt-lg mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ürün</th>
                    <th className="text-center">Miktar</th>
                    <th className="text-center">Birim Fiyat</th>
                    <th className="text-center">Kdv</th>
                    <th className="text-center">Toplam Fiyat</th>
                    <th className="text-center">Birim</th>
                    <th className="text-center">Tedarik</th>
                    <th className="text-center">#</th>
                  </tr>
                </thead>
                {this.state.order.TRANSACTIONS.TRANSACTION.map(
                  (product, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>
                          <button
                            className="btn-link"
                            onClick={(e,index) => this.handleModal(e,index)}
                          >
                            <SearchIcon className={sa.searchIcon} />
                          </button>
                        </td>
                        <td>
                      {this.state.order.TRANSACTIONS.TRANSACTION[index].INTERNAL_REFERENCE}
                        </td>
                        <td>
                          <div>
                            <Input
                              id="itemDescription"
                              name="itemDescription"
                              value={
                                this.state.order.TRANSACTIONS.TRANSACTION[index]
                                  .NAME
                              }
                              type="text"
                              onChange={() => {}}
                            />
                          </div>
                        </td>
                        <td>
                          <div>
                            <Input
                              id="QUANTITY"
                              name="QUANTITY"
                              placeholder="..."
                              value={
                                this.state.order.TRANSACTIONS.TRANSACTION[index]
                                  .QUANTITY
                              }
                              type="text"
                              onChange={(e) => this.changeQuantity(e, index)}
                            />
                          </div>
                        </td>
                        <td>
                          <div>
                            <Input
                              id="PRICE"
                              name="PRICE"
                              placeholder="..."
                              onChange={() => {}}
                              value={
                                this.state.order.TRANSACTIONS.TRANSACTION[index]
                                  .PRICE
                              }
                              type="text"
                            />
                          </div>
                        </td>
                        <td>
                          <div>
                            <Input
                              id="VAT_RATE"
                              name="VAT_RATE"
                              value={
                                this.state.order.TRANSACTIONS.TRANSACTION[index]
                                  .VAT_RATE
                              }
                              placeholder="..."
                              type="text"
                              onChange={(e) => this.changeVat(e, index)}
                            />
                          </div>
                        </td>
                        <td>
                          <div>
                            <Input
                              onChange={() => {}}
                              id="TOTAL"
                              name="TOTAL"
                              placeholder="..."
                              value={
                                this.state.order.TRANSACTIONS.TRANSACTION[index]
                                  .TOTAL
                              }
                              type="text"
                            />
                          </div>
                        </td>
                        <td>
                          <div>
                            <Input
                              id="AUXIL_CODE"
                              name="AUXIL_CODE"
                              value={
                                this.state.order.TRANSACTIONS.TRANSACTION[index]
                                  .AUXIL_CODE
                              }
                              type="select"
                              onChange={(e) => this.changeUnit(e, index)}
                            >
                              <option>BASKISIZ</option>
                              <option>LAZER</option>
                              <option>SERİGRAFİ</option>
                              <option>UV</option>
                              <option>TAMPON</option>
                              <option>SAAT</option>
                              <option>DTF</option>
                              <option>DEPO</option>
                              <option>YANKI</option>
                            </Input>
                          </div>
                        </td>
                        <td>
                          <div>
                            <Input
                              id="AUXIL_CODE2"
                              name="AUXIL_CODE2"
                              value={
                                this.state.order.TRANSACTIONS.TRANSACTION[index]
                                  .AUXIL_CODE2
                              }
                              type="select"
                              onChange={(e) => this.changeSupply(e, index)}
                            >
                              <option>DEPO</option>
                              <option>MÜŞTERİ</option>
                              <option>YANKI</option>
                              <option>X PROMOSYON</option>
                            </Input>
                          </div>
                        </td>
                        <td>
                          <Button
                            onClick={(e) => {
                              this.deleteProduct(e, index);
                            }}
                            className="badge-danger "
                          >
                            Sil
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  )
                )}
              </Table>
            </div>
            <div>
              <Modal isOpen={this.state.modal} toggle={this.handleModal}>
                <ModalHeader>Ürünler</ModalHeader>
                <ModalBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Kod</th>
                        <th>Açıklama</th>
                        <th>Adet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.item.map((item, index) => (
                        <tr>
                          <td><Button
                            onClick={(e) => {
                              this.setProduct(e, index);
                            }}
                            className="badge badge-success mr-2"
                          >
                            Seç
                          </Button></td>
                          <td onClick={(e,index)=>{this.setProduct(e,index)}}>{item.CODE}</td>
                          <td>{item.NAME}</td>
                          <td>{item.UNITS.UNIT[0].DATA_REFERENCE}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <footer className="bg-widget-transparent mt">
                    <input
                      type="search"
                      className="form-control form-control-sm bg-custom-dark border-0"
                      placeholder="Search"
                    />
                  </footer>
                </ModalBody>
              </Modal>
            </div>
          </Widget>

          <Button type="submit" color="success" className="float-right">
            EKLE
          </Button>
        </form>
      </div>
    );
  }
}
