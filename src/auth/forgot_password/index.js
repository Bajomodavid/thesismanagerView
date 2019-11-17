import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './index.css'

export default class ForgotPassword extends Component {

    render() {
        return (
            <div class="forgot-password">
                <h2 class="title">Forgot Your Password?</h2>
                <h4>Enter your email address and you will be sent a link to reset your password</h4>
                <div class="form">
                    <div class="initial">
                        <h2>E</h2>
                    </div>
                    <div class="input">
                        <input type="text" placeholder="Email" />
                    </div>
                </div>
                <div class="button">
                    <button>Send Link</button>
                </div>
                <div class="return-login">
                    <NavLink to="/auth/login"> Return to login</NavLink>
                </div>
            </div>
        );
    }
}