import React, { Component } from 'react';
import { message, Button, Card, Form, Icon, Input } from 'antd';
import { withRouter, NavLink } from "react-router-dom";
import '../style.css';
import { http, handleErrors } from '../../services/http';

class CreateSession extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            name: '',
        }
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
          if (!err) {
            http(
                `admin/sessions`,
                'POST',
                {
                    name:values.name,
                    description: values.description,
                },
            )
            .then((r) => {
                console.log(r);
                message.success(r.data.message)
                setTimeout(
                    this.props.history.push('/admin/session'),
                    1000
                );
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
                                <h2> Create Session</h2> <Button> <NavLink to="/admin/category" style={{color: 'purple'}}><Icon type="caret-left" /> Go Back </NavLink></Button>
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please Input a Name!' }],
                                    initialValue: this.state.name
                                    
                                })(
                                    <Input placeholder="Name" />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('description', {
                                    rules: [{ required: true, message: 'Please Input a description!' }],
                                    initialValue: this.state.description
                                })(
                                    <Input placeholder="Description" />
                                )}
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{width: "100%"}}>Create Session</Button>    
                            </Form.Item>
                        </Form>
                    </Card>

                </div>
            </div>
        );
    }
}

export default withRouter(Form.create()(CreateSession));