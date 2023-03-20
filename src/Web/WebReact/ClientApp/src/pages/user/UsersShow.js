import React from "react";
import Widget from "../../components/Widget";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";


export default class UsersShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = [
      { fullName: "Onur Topal", mobilePhone: "05445118371", unit: "Lazer" },
      {
        fullName: "Ömer Erdoğan",
        mobilePhone: "05445118371",
        unit: "Ön Muhasebe",
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
            <Link to="/app/user/createuser" className="badge badge-success mr-2">+Yeni</Link> Çalışanlar
          </h6>
        }
        refresh
        close
      >
        <div className="widget-body undo_padding">
          <div className="list-group list-group-lg">
            {this.state.map((user) => (
              <button className="list-group-item text-left">
                <div>
                  <Row>
                    <Col>
                    
                    <span className="thumb-sm float-left">
                    <i class="la la-user icon-7x"></i>
                      
                    </span>
                    
                    
                      <h6 className="m-0">{user.fullName}</h6>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {user.mobilePhone}
                      </p>
                    </Col>
                    <Col>
                      <p className="help-block text-ellipsis m-0">
                        {user.unit}
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
