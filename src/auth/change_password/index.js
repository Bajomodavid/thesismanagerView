import React, { Component } from 'react'
import './index.css'

export default class ChangePassword extends Component {

    render() {
        return (
            <div class="update-password">
                <h2 class="title">Update Your Password</h2>
                <div class="form">
                    <div class="input">
                        <input type="password" placeholder="Old Password" />
                    </div>
                </div>
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
                    <button>Update Password</button>
                </div>
            </div>
        );
    }
}