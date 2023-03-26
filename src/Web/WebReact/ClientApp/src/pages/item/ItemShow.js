import { stat } from "fs-extra";
import React from "react";
import { toast } from "react-toastify";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import Widget from "../../components/Widget";

export default class ItemShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      activeIndex: 0,
      filteredItems: [],
    };
    this.state.filteredItems=this.state.item
    this.handleModal = this.handleModal.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
  }
  handleModal(activeIndex) {
    this.setState({ [activeIndex]: activeIndex });
    this.setState({
      modal: !this.state.modal,
    });
  }



  handleSearch(event){
    if (event.target.value==="") {
      this.setState({filteredItems:this.state.item})
    } else {
      this.setState({filteredItems:this.state.item.filter(item=>item.CODE.toLowerCase().includes(event.target.value.toLowerCase()))})
    }
  }

  render() {
    return (
      <Widget title={<h6>Ürünler</h6>} refresh>
        <Row>
          <Col>Kodu</Col>
          <Col>Açıklaması</Col>
          <Col>Adet</Col> {/*Bu bilgide yok acaba başka tabloda mı?*/}
          <Col>Kdv</Col>
        </Row>
        <div className="widget-body undo_padding">
          <div className="list-group list-group-lg">
            {this.state.filteredItems.map((item, index) => (
              <button
                className="list-group-item text-left"
                onClick={() => {
                  this.handleModal(index);
                }}
                key={index}
              >
                <div>
                  <Row>
                    <Col>
                      <h6 className="m-0">{item.CODE} </h6>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {item.NAME}
                      </p>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {item.UNITS.UNIT[0].DATA_REFERENCE}
                      </p>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {item.VAT}
                      </p>
                    </Col>
                    
                  </Row>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          {/* <Modal isOpen={this.state.modal} toggle={this.handleModal}>
            <ModalHeader toggle={this.handleModal}>
              {this.state.customer[this.state.activeIndex].TITLE}
            </ModalHeader>
            <ModalBody>
              <ListGroup>
                <Row>
                  <Col>
                    <ListGroupItem>Kodu</ListGroupItem>
                  </Col>
                  <Col>
                    <ListGroupItem>
                      {this.state.customer[this.state.activeIndex].CODE}
                    </ListGroupItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ListGroupItem>Vergi Numarası</ListGroupItem>
                  </Col>
                  <Col>
                    <ListGroupItem>
                      {this.state.customer[this.state.activeIndex].TAX_ID}
                    </ListGroupItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ListGroupItem>Adresi</ListGroupItem>
                  </Col>
                  <Col>
                    <ListGroupItem>
                      {this.state.customer[this.state.activeIndex].ADDRESS1 +
                        " " +
                        this.state.customer[this.state.activeIndex].ADDRESS2 +
                        " " +
                        this.state.customer[this.state.activeIndex].TOWN +
                        " " +
                        this.state.customer[this.state.activeIndex].CITY}
                    </ListGroupItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ListGroupItem>Telefon 1</ListGroupItem>
                  </Col>
                  <Col>
                    <ListGroupItem>
                      {this.state.customer[this.state.activeIndex]
                        .TELEPHONE1_CODE +
                        " " +
                        this.state.customer[this.state.activeIndex].TELEPHONE1}
                    </ListGroupItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ListGroupItem>Telefon 2</ListGroupItem>
                  </Col>
                  <Col>
                    <ListGroupItem>
                      {this.state.customer[this.state.activeIndex]
                        .TELEPHONE2_CODE +
                        " " +
                        this.state.customer[this.state.activeIndex].TELEPHONE2}
                    </ListGroupItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ListGroupItem>Temsilci</ListGroupItem>
                  </Col>
                  <Col>
                    <ListGroupItem>
                      {this.state.customer[this.state.activeIndex].CONTACT}
                    </ListGroupItem>
                  </Col>
                </Row>
              </ListGroup>
            </ModalBody>
          </Modal> */}
        </div>
        <footer className="bg-widget-transparent mt">
          <input
            type="search"
            className="form-control form-control-sm bg-custom-dark border-0"
            placeholder="Search"
            onChange={this.handleSearch}
          />
        </footer>
      </Widget>
    );
  }
}
