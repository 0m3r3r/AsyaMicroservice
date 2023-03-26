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

export default class CustomerShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: [
        {
          INTERNAL_REFERENCE: 9,
          ACCOUNT_TYPE: 3,
          CODE: "120 A009",
          TITLE: "AYGÜL OFSET MATBAA LTD.ŞTİ.",
          AUXIL_CODE: "A",
          ADDRESS1: "MİTHATPAŞA CAD.NO:59/A",
          ADDRESS2: "KIZILAY",
          TOWN_CODE: 7,
          TOWN: "Çankaya",
          CITY_CODE: 6,
          CITY: "Ankara",
          COUNTRY_CODE: "TR",
          COUNTRY: "Türkiye",
          TELEPHONE1: "431 03 75",
          TELEPHONE1_CODE: 0.312,
          TELEPHONE2: "588 24 88",
          TELEPHONE2_CODE: 0.532,
          FAX: "431 79 83",
          FAX_CODE: 0.312,
          TAX_ID: 1200012678,
          TAX_OFFICE: "ÇANKAYA",
          CONTACT: "MUSTAFA AYGÜL",
          E_MAIL: "aygulofset@gmail.com",
          REMINDER_EMAIL: "aygulofset@gmail.com",
          CORRESP_LANG: 1,
          DATA_REFERENCE: 51,
          CREATED_BY: 3,
          DATE_CREATED: "26.02.2014",
          HOUR_CREATED: 16,
          MIN_CREATED: 5,
          SEC_CREATED: 54,
          MODIFIED_BY: 13,
          DATE_MODIFIED: "01.07.2021",
          HOUR_MODIFIED: 10,
          MIN_MODIFIED: 34,
          SEC_MODIFIED: 45,
          NOTES: {
            NOTE: {
              INTERNAL_REFERENCE: 0,
            },
          },
          CREDIT_TYPE: 1,
          RISKFACT_CHQ: 1,
          RISKFACT_PROMNT: 1,
          GL_CODE: "120.A009",
          ORD_SEND_EMAIL: "aygulofset@gmail.com",
          DSP_SEND_EMAIL: "aygulofset@gmail.com",
          INV_SEND_EMAIL: "aygulofset@gmail.com",
          CL_ORD_FREQ: 1,
          ITR_SEND_MAIL_ADR: "aygulofset@gmail.com",
          INVOICE_PRNT_CNT: 1,
          GENIUSFLDSLIST: "",
          DEFNFLDSLIST: "",
          ORGLOGOID: "",
          PURCHBRWS: 1,
          SALESBRWS: 1,
          IMPBRWS: 1,
          EXPBRWS: 1,
          FINBRWS: 1,
          ACC_RISK_TOTAL: -20000,
          EXT_SEND_EMAIL: "aygulofset@gmail.com",
          FACTORY_DIV_NR: 1,
          CREATE_WH_FICHE: 1,
          EXIM_SEND_EMAILADR: "aygulofset@gmail.com",
          GUID: "DFE7A17F-FCB4-47EC-ADC1-D1336FCB1733",
        },
      ],
      modal: false,
      activeIndex: 0,
      filteredCustomers: [],
    };
    this.state.filteredCustomers=this.state.customer
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
      this.setState({filteredCustomers:this.state.customer})
    } else {
      this.setState({filteredCustomers:this.state.customer.filter(customer=>customer.TITLE.toLowerCase().includes(event.target.value.toLowerCase()))})
    }
  }

  render() {
    return (
      <Widget title={<h6>Müşteriler</h6>} refresh>
        <Row>
        <Col>Ünvan</Col>
          <Col>Kodu</Col>
          <Col>Adres</Col> {/*ADDRESS1+ADDRESS2+TOWN+CİTY*/}
          <Col>Vergi numarası</Col>
          <Col>İskonto</Col>
        </Row>
        <div className="widget-body undo_padding">
          <div className="list-group list-group-lg">
            {this.state.filteredCustomers.map((customer, index) => (
              <button
                className="list-group-item text-left"
                onClick={() => {
                  this.handleModal(index);
                }}
              >
                <div>
                  <Row>
                  <Col>
                      <p className="help-block text-ellipsis m-0">
                        {customer.TITLE}
                      </p>
                    </Col>
                    <Col>
                      <h6 className="m-0">{customer.CODE} </h6>
                    </Col>
                    
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {customer.ADDRESS1 + customer.ADDRESS2 + customer.CITY}
                      </p>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {customer.TAX_ID}
                      </p>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {customer.AUXIL_CODE}
                      </p>
                    </Col>
                  </Row>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.handleModal}>
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
                    <ListGroupItem>
                    Telefon 1
                  
                    </ListGroupItem>
                  </Col>
                  <Col>
                    <ListGroupItem>
                    {this.state.customer[this.state.activeIndex].TELEPHONE1_CODE +
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

                  {this.state.customer[this.state.activeIndex].TELEPHONE2_CODE +
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
          </Modal>
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
