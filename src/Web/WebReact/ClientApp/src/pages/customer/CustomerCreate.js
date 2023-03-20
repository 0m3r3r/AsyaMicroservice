import React from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Alert,
  Button,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Row,
  Col
} from "reactstrap";
import Widget from "../../components/Widget";



export default class CustomerCreate extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };
  constructor(props) {
    super(props);

    this.state = {
        type:"", 
      code: "",
      calling: "",
      adress: "",
      discount: "",
      identificationNumber:"",
      representativeAlias: "",
      representativePhoneNumber: "",
      representativeFullName: "",
      representativeEmailAdress:"",
      
    };



    this.changeType=this.changeType.bind(this)
    this.changeCode=this.changeCode.bind(this)
    this.changeCalling=this.changeCalling.bind(this)
    this.changeAdress=this.changeAdress.bind(this)
    this.changeDiscount=this.changeDiscount.bind(this)
    this.changeIdentificationNumber=this.changeIdentificationNumber.bind(this)
    this.changeRepresentativeAlias=this.changeRepresentativeAlias.bind(this)
    this.changeRepresentativePhoneNumber=this.changeRepresentativePhoneNumber.bind(this)
    this.changeRepresentativeFullName=this.changeRepresentativeFullName.bind(this)
    this.changeRepresentativeEmailAdress=this.changeRepresentativeEmailAdress.bind(this)
    this.doAdd=this.doAdd.bind(this)


  }
  changeType(event) {
    this.setState({ type: event.target.value });
  }
  changeCode(event) {
    this.setState({ code: event.target.value });
  }
  changeCalling(event) {
    this.setState({ calling: event.target.value });
  }
  changeAdress(event) {
    this.setState({ adress: event.target.value });
  }
  changeDiscount(event) {
    this.setState({ discount: event.target.value });
  }
  changeIdentificationNumber(event) {
    this.setState({ identificationNumber: event.target.value });
  }
  changeRepresentativeAlias(event) {
    this.setState({ representativeAlias: event.target.value });
  }
  changeRepresentativeFullName(event) {
    this.setState({ representativeFullName: event.target.value });
  }
  changeRepresentativePhoneNumber(event) {
    this.setState({ representativeFullName: event.target.value });
  }

  changeRepresentativeEmailAdress(event) {
    this.setState({ representativeEmailAdress: event.target.value });
  }
  doAdd(e) {
    e.preventDefault();

    let customer={
        
        code:this.state.code,
        calling:this.state.calling,
        adress:this.state.adress,
        discount: this.state.discount,
        identificationNumber:this.state.identificationNumber
        
        
    }

    let representative ={
        representativeAlias: this.state.representativeAlias,
        representativeFullName: this.state.representativeFullName,
        representativePhoneNumber: this.state.representativePhoneNumber,
        representativeEmailAdress:this.state.representativeEmailAdress,
    }

    
  }

  


  render() {
    return (
      <div className="auth-page">
        <Container>
          <Widget
            
            title={<h3 className="mt-0">Müşteri Ekle</h3>}
          >
            <p className="widget-auth-info"></p>
            <form onSubmit={this.doLogin}>
              {this.props.errorMessage && (
                <Alert
                  className="alert-sm widget-middle-overflow rounded-0"
                  color="danger"
                >
                  {this.props.errorMessage}
                </Alert>
              )}

              <Row>
                <Col>
              <FormGroup className="mx">
                <Label for="code">Kodu</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="code"
                    className="input-transparent pl-3"
                    value={this.state.code}
                    onChange={this.changeCode}
                    type="text"
                    required
                    name="code"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label for="calling">Ünvanı</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-phone text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="calling"
                    className="input-transparent pl-3"
                    value={this.state.calling}
                    onChange={this.changeCalling}
                    type="number"
                    required
                    name="calling"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label for="adress">Adres</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-address-card text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="adress"
                    className="input-transparent pl-3"
                    value={this.state.adress}
                    onChange={this.changeAdress}
                    type="text"
                    required
                    name="adress"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label for="discount">Email</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-mail-bulk text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="discount"
                    className="input-transparent pl-3"
                    value={this.state.discount}
                    onChange={this.changeDiscount}
                    type="number"
                    required
                    name="discount"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="identificationNumber">Vergi numarası</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-sticky-note text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="identificationNumber"
                    className="input-transparent pl-3"
                    value={this.state.identificationNumber}
                    onChange={this.changeIdentificationNumber}
                    type="number"
                    required
                    name="identificationNumber"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>
              </Col>
              <Col>
              
              
              
              <FormGroup>
                <Label for="representativeAlias">Müşteri temsilci ünvanı</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-genderless text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="representativeAlias"
                    className="input-transparent pl-3"
                    value={this.state.representativeAlias}
                    onChange={this.changeRepresentativeAlias}
                    type="text"
                    required
                    name="representativeAlias"
                    placeholder=""
                  >
                </Input> 
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label for="representativePhoneNumber">Müşteri temsilcisi telefon numarası</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-lock text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="representativePhoneNumber"
                    className="input-transparent pl-3"
                    value={this.state.representativePhoneNumber}
                    onChange={this.changeRepresentativePhoneNumber}
                    type="number"
                    required
                    name="representativePhoneNumber"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <Label for="representativeFullName">Müşteri temsilcisi Ad Soyad</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-info-circle text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="representativeFullName"
                    className="input-transparent pl-3"
                    value={this.state.representativeFullName}
                    onChange={this.changeRepresentativeFullName}
                    type="text"
                    required
                    name="representativeFullName"
                    placeholder=""
                  >
                    </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="representativeEmailAdress">Müşteri temsilcisi Ad Soyad</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-info-circle text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="representativeEmailAdress"
                    className="input-transparent pl-3"
                    value={this.state.representativeEmailAdress}
                    onChange={this.changeRepresentativeEmailAdress}
                    type="text"
                    required
                    name="representativeEmailAdress"
                    placeholder=""
                  >
                    </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="type">Müşteri Tipi</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-info-circle text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="type"
                    className="input-transparent pl-3"
                    value={this.state.type}
                    onChange={this.changeType}
                    type="select"
                    required
                    name="type"
                    placeholder=""
                  >
                    <option>Gerçek kişi</option>
                    <option>Tüzel kişi</option>
                    </Input>
                </InputGroup>
              </FormGroup>
              </Col>
              </Row>
              
                <div style={{float: 'right'}}>
                <Button
                  type="submit"
                  color="danger"
                  className="auth-btn"
                  size="sm"
                  style={{ color: "#fff" }}
                >
                  <span className="auth-btn-circle" style={{ marginRight: 8 }}>
                    <i className="la la-caret-right" />
                  </span>
                  {this.props.isFetching ? "Loading..." : "Kaydet"}
                </Button>
                </div>
              
            </form>
          </Widget>
        </Container>
      </div>
    );
  }
}
