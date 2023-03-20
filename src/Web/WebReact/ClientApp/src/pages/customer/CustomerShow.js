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
  Col,
} from "reactstrap";
import Widget from "../../components/Widget";

export default class CustomerCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = [
      {
        code: "320",
        calling: "Ziraat B.",
        adress: "Yenimahalle Depo",
        identificationNumber: "123456789",
        discount: "%45",
      },
    ];
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Widget
        title={
          <h6>
            <Link
              to="/app/customer/createcustomer"
              className="badge badge-success mr-2"
            >
              +Yeni
            </Link>{" "}
            Müşteriler
          </h6>
        }
        refresh
      >
        <Row>
          <Col>Ünvan</Col>
          <Col>Adres</Col>
          <Col>Kod</Col>
          <Col>Vergi numarası</Col>
          <Col>İskonto</Col>
        </Row>
        <div className="widget-body undo_padding">
          <div className="list-group list-group-lg">
            {this.state.map((customer) => (
              <button className="list-group-item text-left">
                <div>
                  <Row>
                    <Col>
                      <span className="thumb-sm float-left">
                        <i class="la la-user icon-7x"></i>
                      </span>

                      <h6 className="m-0">{customer.calling} </h6>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {customer.adress}
                      </p>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {customer.code}
                      </p>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {customer.identificationNumber}
                      </p>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {customer.discount}
                      </p>
                    </Col>
                  </Row>
                </div>
              </button>
            ))}
          </div>
        </div>
        <footer className="bg-widget-transparent mt">
          <input
            type="search"
            className="form-control form-control-sm bg-custom-dark border-0"
            placeholder="Search"
          />
        </footer>
      </Widget>
    );
  }
}
