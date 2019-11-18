import React, { Component } from 'react';
import { message, Button, Card, Form, Icon, Input, Select } from 'antd';
import { withRouter, NavLink } from "react-router-dom";
import '../style.css';
import { http, handleErrors } from '../../services/http';
const Option = Select.Option;

class CategoryDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            name: '',
        }
    }

    componentDidMount() {
        this.getCategory()
    }

    getCategory() {
        http(
            `admin/categories/${this.props.match.params.id}`,
        )
        .then((r) => {
            this.setState({
                name: r.data.message.name,
                description: r.data.message.description,
            })
        })
        .catch((e) => {
            console.log(e);
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
          if (!err) {
            http(
                `admin/categories/${this.props.match.params.id}`,
                'PUT',
                {
                    name:values.name,
                    description: values.description,
                },
            )
            .then((r) => {
                console.log(r);
                message.success(r.data.message)
                setTimeout(
                    this.props.history.push('/admin/category'),
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
                                <h2> Update Category</h2> <Button> <NavLink to="/admin/category" style={{color: 'purple'}}><Icon type="caret-left" /> Go Back </NavLink></Button>
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
                                <Button type="primary" htmlType="submit" style={{width: "100%"}}>Update Category</Button>    
                            </Form.Item>
                        </Form>
                    </Card>

                </div>
            </div>
        );
    }
}

export default withRouter(Form.create()(CategoryDetails));