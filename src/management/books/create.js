import React, { Component } from 'react';
import { message, Button, Card, Form, Icon, Input, Select } from 'antd';
import { withRouter, NavLink } from "react-router-dom";
import '../style.css';
import { http, handleErrors, baseUrl } from '../../services/http';
import axios from "axios";
const Option = Select.Option;

class CreateBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: '',
            category: '',
            sessions: '',
            session: '',
            departments: '',
            department: '',
            author: '',
            tittle: '',
            public: 0,
            selectedFile: null,
        }
    }

    getSessions() {
        http(
            `admin/sessions`,
        )
        .then((r) => {
            this.setState({sessions: this.renderSessions(r.data.message)})
        })
        .catch((e) => {
            console.log(e)
        })
    }

    renderSessions(data) {
        let d = data.map((a, i) => 
            <Option value={a.id} key={i}>
                {a.name}
            </Option>
        )

        return (
            d
        )
    }

    getCategories() {
        http(
            `admin/categories`,
        )
        .then((r) => {
            this.setState({categories: this.renderCategories(r.data.message)})
        })
        .catch((e) => {
            console.log(e)
        })
    }

    renderCategories(data) {
        let d = data.map((a, i) => 
            <Option value={a.id} key={i}>
                {a.name}
            </Option>
        )

        return (
            d
        )
    }

    getDepartments() {
        http(
            `admin/departments`,
        )
        .then((r) => {
            this.setState({sessions: this.renderDepartments(r.data.message)})
        })
        .catch((e) => {
            console.log(e)
        })
    }

    renderDepartments(data) {
        let d = data.map((a, i) => 
            <Option value={a.id} key={i}>
                {a.name}
            </Option>
        )

        return (
            d
        )
    }

    componentDidMount() {
        this.getSessions()
        this.getCategories()
        // this.getDepartments()
    }

    handleSubmit = (e) => {
        if(this.state.selectedFile === null) return message.warning('Select A file to upload')
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
          if (!err) {
            const data = new FormData()
            data.append('book', this.state.selectedFile)
            data.append('author', values.author)
            data.append('title', values.title)
            data.append('session_id', values.session_id)
            data.append('category_id', values.category_id)
            data.append('public', values.public)
            axios.post(`${baseUrl}admin/books`, data, { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then((r) => {
                console.log(r);
                message.success(r.data.message)
                setTimeout(
                    this.props.history.push('/admin/books'),
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
                                <h2> Upload Book</h2> <Button> <NavLink to="/admin/books" style={{color: 'purple'}}><Icon type="caret-left" /> Go Back </NavLink></Button>
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('author', {
                                    rules: [{ required: true, message: 'Please Input an author name!' }],
                                    initialValue: this.state.author
                                    
                                })(
                                    <Input placeholder="Author" />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('book', {
                                    rules: [{ required: true, message: 'Please Input an author name!' }],
                                    initialValue: this.state.author
                                    
                                })(
                                    <Input type='file' placeholder="Book" onChange={(e) => this.setState({selectedFile: e.target.files[0]})} />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('tittle', {
                                    rules: [{ required: true, message: 'Please Input a title!' }],
                                    initialValue: this.state.tittle
                                    
                                })(
                                    <Input placeholder="Title" />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('session_id', {
                                    rules: [{ required: true, message: 'Please Select a Session!' }],
                                    initialValue: ''
                                })(
                                    <Select>
                                        <Option value=''>
                                            Select Session
                                        </Option>
                                        {this.state.sessions !== "" && this.state.sessions}
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('category_id', {
                                    rules: [{ required: true, message: 'Please Select a Category!' }],
                                    initialValue: ''
                                })(
                                    <Select>
                                        <Option value=''>
                                            Select Category
                                        </Option>
                                        {this.state.categories !== "" && this.state.categories}
                                    </Select>
                                )}
                            </Form.Item>

                            {/* <Form.Item>
                                {getFieldDecorator('category_id', {
                                    rules: [{ required: true, message: 'Please Select a Department!' }],
                                    initialValue: this.state.department
                                })(
                                    <Select>
                                        {this.state.department !== "" && this.state.department}
                                    </Select>
                                )}
                            </Form.Item> */}

                            <Form.Item>
                                {getFieldDecorator('public', {
                                    rules: [{ required: true, message: 'Please select a status!' }],
                                    initialValue: this.state.public
                                })(
                                    <Select>
                                        <Option value={0}> Protected </Option>
                                        <Option value={1}> Public </Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{width: "100%"}}>Upload Thesis</Button>    
                            </Form.Item>
                        </Form>
                    </Card>

                </div>
            </div>
        );
    }
}

export default withRouter(Form.create()(CreateBook));