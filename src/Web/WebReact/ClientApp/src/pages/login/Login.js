import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, Label, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import Widget from '../../components/Widget';
import { loginUser,loginError } from '../../actions/user';


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
            email: '5445118371',
            password: '12345',
            rememberMe: true,
            returnUrl: ""
        };

        this.doLogin = this.doLogin.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeRememberMe=this.changeRememberMe.bind(this);
        this.changeReturnUrl=this.changeReturnUrl.bind(this);
        // this.signUp = this.signUp.bind(this);
    }

    changeEmail(event) {
        this.setState({ email: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }
    changeRememberMe(event) {
        this.setState({ rememberMe: event.target.value });
    }
    changeReturnUrl(event) {
        this.setState({ returnUrl: event.target.value });
    }

    doLogin(e) {
        e.preventDefault();
        this.props.dispatch(loginUser({ email: this.state.email, password: this.state.password,rememberMe:this.state.rememberMe,returnUrl:this.state.returnUrl }));

        localStorage.setItem('authenticated', true)

        // let authService= new AuthService()
        // authService.login(this.state).then((result)=>{
        //     localStorage.setItem('authenticated', true)   //
        //     localStorage.setItem('user', result.data.data)
        // }).catch(()=>{
        //     this.props.dispatch(loginError('Something was wrong. Try again'));
        // })
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
                                <Label for="email">Email</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-user text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="email" className="input-transparent pl-3" value={this.state.email} onChange={this.changeEmail} type="email"
                                           required name="emaik" placeholder="@"/>
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
                            <FormGroup>
                                <Label for="rememberMe">Beni Hatırla</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-lock text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="rememberMe" className="input-transparent pl-3" value={this.state.password}
                                           onChange={this.changeRememberMe} type="checkbox"
                                           required name="rememberMe"/>
                                           Beni Hatırla
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

