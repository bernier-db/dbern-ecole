import React from 'react';
import PropTypes from 'prop-types'


class SigninPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            nom: "",
            prenom: "",
            remember_me: false,
            registerIsValid: false,
            displayMessage: false,
            messageType: "",
            message: "",
            submitted: false,
        };
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    login(e) {
        e.preventDefault();
        this.setState({submitted: true});
        $.ajax({
            method: 'post',
            url: 'users/sign_in',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            data: {
                email: this.state.email,
                password: this.state.password,
                remember_me: this.state.remember_me
            },
            success: this.onLoginSuccess.bind(this)
        });
    }

    onLoginSuccess(res) {
        this.setState({submitted: true},
            () => {
                if (!res.ok) {
                    this.displayError(res.msg);
                }
                else {
                    this.props.setSigned_in({
                            isLogged: true,
                            user: {
                                prenom: res.user.prenom,
                                nom: res.user.nom,
                                email: res.user.email
                            }
                        }, () => {
                            if (!this.props.checkIfHasGame()) {
                                this.props.redirect('/home');
                            }
                        }
                    );
                }
            });
    }

    register(e) {
        e.preventDefault();
        this.setState({submitted: true});
        if (this.validateRegister()) {
            $.ajax({
                method: 'post',
                url: '/users',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', auth)
                },
                data: {
                    nom: this.state.nom,
                    prenom: this.state.prenom,
                    email: this.state.email,
                    password: this.state.password,
                    password_confirmation: this.state.confirm_password
                },
                success: function (res) {
                    if (!res.success) {
                        this.displayError(res.msg);
                    }
                    else {
                        this.setState({
                            displayMessage: false
                        });
                        this.props.setSigned_in({
                            isLogged: res.isLogged,
                            user: {
                                prenom: res.user.prenom,
                                nom: res.user.nom,
                                email: res.user.email,
                                id: res.user.id
                            }
                        });
                        this.props.redirect('/');
                    }
                }.bind(this)
            });
        }
    }

    displayError(msg) {
        this.setState({
            displayMessage: true,
            messageType: "error",
            message: msg,
            submitted: false
        });
    }

    emailValueChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    passwordValueChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    confirm_passwordValueChange(e) {
        this.setState({
            confirm_password: e.target.value
        });
    }

    comparePasswords(e) {
        if (this.state.password !== this.state.confirm_password) {
            if (!$(e.target).hasClass('error'))
                $(e.target).addClass('error');
        }
        else {
            $(e.target).removeClass('error');
        }
    }

    nomValueChange(e) {
        this.setState({
            nom: e.target.value
        });
    }

    prenomValueChange(e) {
        this.setState({
            prenom: e.target.value
        });
    }

    rememberMeValueChange(e) {
        this.setState({
            remember_me: e.target.checked
        });
    }

    validateRegister() {
        if (this.state.confirm_password !== this.state.password)
            return false;
        return true;
    }

    render() {
        if (this.props.isLogged)
            this.props.redirect('/');

        return (
            <div className="loginPage">


                <form className="green" onSubmit={this.login}>

                    <h3>Login</h3>
                    <input name="email" type="email" placeholder="Email" value={this.state.email}
                           onChange={this.emailValueChange.bind(this)} required/>
                    <input type="password" placeholder="Password" name="password" value={this.state.password}
                           onChange={this.passwordValueChange.bind(this)} required/>
                    <label><input type="checkbox" name="remember" checked={this.state.remember_me}
                                  onChange={this.rememberMeValueChange.bind(this)}/>Remember me</label>
                    <input type="submit" value="Log in" disabled={this.state.submitted}/>
                    <div
                        className={"message " + this.state.messageType + (this.state.displayMessage ? ' active' : '')}>
                        {this.state.message}
                    </div>
                </form>
                <form className="blue" onSubmit={this.register}>
                    <h3>Register</h3>
                    <input name="prenom" type="text" placeholder="Name" value={this.state.prenom}
                           onChange={this.prenomValueChange.bind(this)} required/>
                    <input name="nom" type="text" placeholder="Surname" value={this.state.nom}
                           onChange={this.nomValueChange.bind(this)} required/>
                    <input name="email" type="email" placeholder="Email" value={this.state.email}
                           onChange={this.emailValueChange.bind(this)} required/>
                    <input type="password" placeholder="Password" name="password" value={this.state.password}
                           onChange={this.passwordValueChange.bind(this)}
                           required/>
                    <input type="password" placeholder="Confirm password" name="confirm_password"
                           value={this.state.confirm_password} onBlur={this.comparePasswords.bind(this)}
                           onChange={this.confirm_passwordValueChange.bind(this)}
                           required/>

                    <input type="submit" value="Register" disabled={this.state.submitted}/>
                </form>
            </div>
        );
    }
}

SigninPage.propTypes = {
    setSigned_in: PropTypes.func,
    isLogged: PropTypes.bool,
    redirect: PropTypes.func,
};

export default SigninPage;