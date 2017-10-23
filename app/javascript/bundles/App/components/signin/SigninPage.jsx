import React from 'react';
import PropTypes from 'prop-types'

class SigninPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loginPage">
                <form className="green">
                    <h3>Login</h3>
                    <input name="email" type="email" placeholder="Email" required/>
                    <input type="password" placeholder="Password" name="password" required/>
                    <label><input type="checkbox" name="remember"/>Remember me</label>
                    <input type="submit" value="Log in"/>
                </form>
                <form className="blue">
                    <h3>Register</h3>
                    <input name="prenom" type="text" placeholder="Name"/>
                    <input name="nom" type="text" placeholder="Surname"/>
                    <input name="email" type="email" placeholder="Email" required/>
                    <input type="password" placeholder="Password" name="password" required/>
                    <input type="password" placeholder="Confirm password" name="confirm_password" required/>

                    <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}

SigninPage.propTypes = {};

export default SigninPage;