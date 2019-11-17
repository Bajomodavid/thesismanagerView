import React, { Component } from 'react'
import './index.css'
import { message } from 'antd';
import { http, handleErrors } from '../../services/http';
import moment from 'moment';
import { withRouter, NavLink } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        if(localStorage.getItem('token')) {
            if(localStorage.getItem('role') === 'admin') {
                this.props.history.push('/admin/books')
            }
            if(localStorage.getItem('role') === 'student') {
                this.props.history.push('/search')
            }
        }

        // localStorage.clear()
    }

    authenticate() {
        if(this.state.email.length < 1) return message.warning('Both email and password are required');
        http(
            'auth/login',
            'POST',
            {
                email: this.state.email,
                password: this.state.password,
            }
        )
        .then((r) => {
            console.log(r)
            message.success('Authentication Successful');
            
            localStorage.setItem('role', r.data.role);
            if(r.data.role === 'admin') {
                let expires = moment.now() + (24 * 3600);
            
                localStorage.setItem('token', r.data.access_token);
                localStorage.setItem('token_expires', expires);
                this.props.history.push('/admin/books')
            }
            else {
                localStorage.setItem('token', r.data.access_token);
                localStorage.setItem('token_expires', moment.now + r.data.expires);
                this.props.history.push('/search')
            }

        })
        .catch((e) => {
            console.log(e)
            let errors = handleErrors(e.response.data);
            if(Array.isArray(errors)) {
                for (let index = 0; index < errors.length; index++) {
                    message.error(errors[index]);
                }
            }
            else {
                message.error(errors);
            }
        })
    }

    render() {
        return (
            <div className="login-modal">
                <h2 className="title">Member Sign In</h2>
                <div className="form">
                    <div className="initial">
                        <h2>E</h2>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Email" onChange={(e) => this.setState({email: e.target.value})}/>
                    </div>
                </div>
                <div className="form">
                    <div className="initial">
                        <h2>P</h2>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
                    </div>
                </div>
                <NavLink className="forgot-password" to='/auth/forgot'><span>Forgot Password?</span></NavLink>
                <div className="signup">
                    <button  onClick={() => this.authenticate()}>Sign In</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);