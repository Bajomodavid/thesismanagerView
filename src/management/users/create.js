import React, { Component } from 'react';
import { message, Button, Card, Form, Icon, Input, Select } from 'antd';
import { withRouter, NavLink } from "react-router-dom";
import '../style.css';
import { http, handleErrors, baseUrl } from '../../services/http';
import axios from "axios";
const Option = Select.Option;

class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: '',
        }
    }

    handleSubmit = (e) => {
        if(this.state.selectedFile === null) return message.warning('Select A file to upload')
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
          if (!err) {
            http(
                'admin/users',
                'POST',
                {
                    name: values.name,
                    email: values.email,
                }
            )
            .then((r) => {
                console.log(r);
                message.success('User created with password: ' + r.data.message.password, 20)
            })
            .catch((e) => {
                console.log(e.response);
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
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="content">
                    <Card className="edit-note">
                        <Form onSubmit={this.handleSubmit} style={{width: "100%", justifyContent: "center"}}>
                            <Form.Item>
                                <h2> Create User</h2> <Button> <NavLink to="/admin/books" style={{color: 'purple'}}><Icon type="caret-left" /> Go Back </NavLink></Button>
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please Input an email!' }],
                                    
                                })(
                                    <Input type='email' placeholder="Email" />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please Input a name!' }],
                                    
                                })(
                                    <Input placeholder="Name" />
                                )}
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{width: "100%"}}>Create User</Button>    
                            </Form.Item>
                        </Form>
                    </Card>

                </div>
            </div>
        );
    }
}

export default withRouter(Form.create()(CreateUser));