import React, { Component } from 'react'
import './index.css'

export default class ResetPassword extends Component {

    render() {
        return (
            <div class="reset-password">
                <h2 class="title">Reset Your Password</h2>
                <div class="form">
                    <div class="input">
                        <input type="password" placeholder="New Password" />
                    </div>
                </div>
                <div class="form">
                    <div class="input">
                        <input type="password" placeholder="Repeat Password" />
                    </div>
                </div>
                <div class="button">
                    <button>Reset Password</button>
                </div>
            </div>
        );
    }
}