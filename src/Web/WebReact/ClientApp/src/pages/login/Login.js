import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, Label, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import Widget from '../../components/Widget';
import { loginUser } from '../../actions/user';

class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    static isAuthenticated(token) {
        if (token) return true;
    }

    constructor(props) {
        super(props);

        this.state = {
            mobilePhone: '5445118371',
            password: '12345',
        };

        this.doLogin = this.doLogin.bind(this);
        this.changeMobilePhone = this.changeMobilePhone.bind(this);
        this.changePassword = this.changePassword.bind(this);
        // this.signUp = this.signUp.bind(this);
    }

    changeMobilePhone(event) {
        this.setState({ mobilePhone: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    doLogin(e) {
        e.preventDefault();
        this.props.dispatch(loginUser({ mobilePhone: this.state.mobilePhone, password: this.state.password }));

    
    }

    // signUp() {
    //     this.props.history.push('/register');
    // }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/app' } }; // eslint-disable-line

        // cant access login page while logged in
        if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
            return (
                <Redirect to={from} />
            );
        }

        return (
            <div className="auth-page">
                <Container>
                    <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">ASYA Promosyon Web App</h3>}>
                        <p className="widget-auth-info">
                           
                        </p>
                        <form onSubmit={this.doLogin}>
                            {
                                this.props.errorMessage && (
                                    <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                                        {this.props.errorMessage}
                                    </Alert>
                                )
                            }
                            <FormGroup className="mt">
                                <Label for="mobilePhone">Telefon Numarası</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-user text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="mobilePhone" className="input-transparent pl-3" value={this.state.mobilePhone} onChange={this.changeMobilePhone} type="number"
                                           required name="mobilePhone" placeholder="5xxxxxxxxx"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-lock text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="password" className="input-transparent pl-3" value={this.state.password}
                                           onChange={this.changePassword} type="password"
                                           required name="password" placeholder="Password"/>
                                </InputGroup>
                            </FormGroup>
                            <div className="bg-widget auth-widget-footer" style={{paddingBottom: 8}}>
                                <Button type="submit" color="danger" className="auth-btn"
                                        size="sm" style={{color: '#fff'}}>
                                  <span className="auth-btn-circle" style={{marginRight: 8}}>
                                    <i className="la la-caret-right"/>
                                  </span>
                                  {this.props.isFetching ? 'Loading...' : 'Login'}
                                </Button>
                                
                            </div>
                        </form>
                    </Widget>
                </Container>
                <footer className="auth-footer">
                {new Date().getFullYear()} &copy; Asya Promosyon Template - React Admin Dashboard Template Made by <a href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic LLC</a>.
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Login));

