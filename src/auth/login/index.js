import React, { Component } from 'react'
import './index.css'
import { message, Input, Button } from 'antd';
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
            if(localStorage.getItem('role') === 'admin' && localStorage.getItem('role') !== null) {
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
            
            localStorage.setItem('role', r.data.role);
            if(r.data.role === 'admin') {
                message.success('Check your email inbox for OTP', 6);
                let expires = moment.now() + (24 * 3600);
            
                localStorage.setItem('token', r.data.access_token);
                localStorage.setItem('token_expires', expires);
                this.props.history.push('/auth/otp')
            }
            else {
                message.success('Authentication Successful');
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
                        {/* <h2>E</h2> */}
                    </div>
                    <div className="input">
                        <Input type="text" placeholder="Email" onChange={(e) => this.setState({email: e.target.value})}/>
                    </div>
                </div>
                <div className="form">
                    <div className="initial">
                        {/* <h2>P</h2> */}
                    </div>
                    <div className="input">
                        <Input type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
                    </div>
                </div>
                <NavLink className="forgot-password" to='/auth/forgot'><span>Forgot Password?</span></NavLink>
                <div className="">
                    <Button size='large' style={{
                        width: '30.5em',
                        marginLeft: '3em',
                        marginTop: '1em',
                    }}  onClick={() => this.authenticate()}>Sign In</Button>
                </div>
                <div className='homepage'>
                    <NavLink to='/'>
                        <Button type='ghost' style={{color: '#fff'}}>Homepage</Button>
                    </NavLink>
                </div>

                <div className='homepage'>
                    <NavLink to='/search'>
                        <Button type='ghost' style={{color: '#fff'}}>Visit Repository</Button>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);