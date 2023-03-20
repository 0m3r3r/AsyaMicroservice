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
import { loginUser, loginError } from "../../actions/user";


export default class UserCreate extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      mobilePhones: "",
      address: "",
      notes: "",
      gender: "",
      password:"",
      unit:""
    };

    this.units=[{title:"Lazer"},{title:"Uv"}]

    this.changeFullName=this.changeFullName.bind(this)
    this.changeMobilePhones=this.changeMobilePhones.bind(this)
    this.changeAddress=this.changeAddress.bind(this)
    this.changeEmail=this.changeEmail.bind(this)
    this.changeGender=this.changeGender.bind(this)
    this.changeNotes=this.changeNotes.bind(this)
    this.changeUnit=this.changeUnit.bind(this)
    this.changePassword=this.changePassword.bind(this)
    this.doAdd=this.doAdd.bind(this)


  }
  changeFullName(event) {
    this.setState({ fullName: event.target.value });
  }
  changeEmail(event) {
    this.setState({ email: event.target.value });
  }
  changeMobilePhones(event) {
    this.setState({ mobilePhones: event.target.value });
  }
  changeAddress(event) {
    this.setState({ address: event.target.value });
  }
  changeNotes(event) {
    this.setState({ notes: event.target.value });
  }
  changeGender(event) {
    this.setState({ gender: event.target.value });
  }
  changePassword(event) {
    this.setState({ password: event.target.value });
  }
  changeUnit(event) {
    this.setState({ unit: event.target.value });
  }

  doAdd(e) {
    e.preventDefault();

    
  }

  componentDidMount(){
 
  }


  render() {
    return (
      <div className="auth-page">
        <Container>
          <Widget
            
            title={<h3 className="mt-0">Çalışan Ekle</h3>}
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
                <Label for="fullName">Ad Soyad</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="fullName"
                    className="input-transparent pl-3"
                    value={this.state.fullName}
                    onChange={this.changeFullName}
                    type="text"
                    required
                    name="fullName"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label for="mobilePhones">Telefon Numarası</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-phone text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="mobilePhones"
                    className="input-transparent pl-3"
                    value={this.state.mobilePhones}
                    onChange={this.changeMobilePhones}
                    type="number"
                    required
                    name="mobilePhones"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label for="address">Adres</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-address-card text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="mobilePhones"
                    className="input-transparent pl-3"
                    value={this.state.address}
                    onChange={this.changeAddress}
                    type="text"
                    required
                    name="address"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label for="email">Email</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-mail-bulk text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    value={this.state.email}
                    onChange={this.changeEmail}
                    type="email"
                    required
                    name="email"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>
              </Col>
              <Col>
              
              <FormGroup>
                <Label for="notes">Not</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-sticky-note text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="notes"
                    className="input-transparent pl-3"
                    value={this.state.notes}
                    onChange={this.changeNotes}
                    type="textarea"
                    required
                    name="notes"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label for="gender">Cinsiyet</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-genderless text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="gender"
                    className="input-transparent pl-3"
                    value={this.state.gender}
                    onChange={this.changeGender}
                    type="select"
                    required
                    name="gender"
                    placeholder=""
                  >
                  <option>Erkek</option>
                  <option>Kadın</option>
                </Input> 
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label for="password">Şifre</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-lock text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    value={this.state.password}
                    onChange={this.changePassword}
                    type="text"
                    required
                    name="password"
                    placeholder=""
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <Label for="unit">Birimi</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-info-circle text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="unit"
                    className="input-transparent pl-3"
                    value={this.state.unit}
                    onChange={this.changeUnit}
                    type="select"
                    required
                    name="unit"
                    placeholder=""
                  >
                    {this.units.map((unit)=>(
                        <option>{unit.title}</option>
                    ))}
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
