import React, { Component } from 'react'
import './index.css'
import { message, Input, Button } from 'antd';
import { http, handleErrors } from '../../services/http';
import { withRouter } from 'react-router-dom';

class Otp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            password: '',
        };
        if(localStorage.getItem('token')) {
            if(localStorage.getItem('role') === 'admin' && localStorage.getItem('allowed') === true) {
                this.props.history.push('/admin/books')
            }
        }

        // localStorage.clear()
    }

    authenticate() {
        if(this.state.otp.length < 1) return message.warning('OTP is required');
        http(
            'auth/otp',
            'POST',
            {
                otp: this.state.otp,
            }
        )
        .then((r) => {
            console.log(r)
            localStorage.setItem('allowed', '1');
            message.success('Authentication Successful');
            this.props.history.push('/admin/books')
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
                <h2 className="title">Admin OTP verification</h2>
                <div className="form">
                    <div className="initial">
                        {/* <h2>E</h2> */}
                    </div>
                    <div className="input">
                        <Input type="text" placeholder="OTP" onChange={(e) => this.setState({otp: e.target.value})}/>
                    </div>
                </div>
                <div className="">
                    <Button size='large' style={{
                        width: '30.5em',
                        marginLeft: '3em',
                        marginTop: '1em',
                    }}  onClick={() => this.authenticate()}>Verify OTP</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(Otp);