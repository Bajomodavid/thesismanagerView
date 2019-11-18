import React, { Component } from 'react';
import { message, Button, Card, Form, Icon, Input, Select } from 'antd';
import { withRouter, NavLink } from "react-router-dom";
import '../style.css';
import { http, handleErrors } from '../../services/http';
const Option = Select.Option;

class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            name: '',
            email: '',
        }
    }

    getUser() {
        http(
            `admin/users/${this.props.match.params.id}`,
        )
        .then((r) => {
            this.setState({
                name: r.data.message.name,
                status: r.data.message.status,
                email: r.data.message.email,
            })
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
        this.getBook()
        this.getCategories()
        // this.getDepartments()
    }

    getBook() {
        http(
            `admin/books/${this.props.match.params.id}`,
        )
        .then((r) => {
            
        })
        .catch((e) => {
            console.log(e);
        })
    }

    statusCheck() {
        if(this.state.status === 1) {
            return (
                <Button style={{
                    marginTop: '2em',
                    alignSelf: 'center',
                }} type='danger'>
                    Ban
                </Button>
            );
        }

        return (
            <Button style={{
                marginTop: '2em',
                alignSelf: 'center',
            }} type='success'>
                Activate
            </Button>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
          if (!err) {
            http(
                `admin/books/${this.props.match.params.id}`,
                'PUT',
                {
                    author:values.author,
                    title: values.tittle,
                    session_id: values.session_id,
                    category_id: values.category_id,
                    public: values.public,
                },
            )
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
                        <h2> Update Book</h2> <Button> <NavLink to="/admin/users" style={{color: 'purple'}}><Icon type="caret-left" /> Go Back </NavLink></Button> <br />
                        <Button style={{
                            marginTop: '2em',
                            alignSelf: 'center',
                        }} type='ghost'>
                            Regenerate Password
                        </Button>
                        
                        {this.statusCheck()}
                        <Button style={{
                            marginTop: '2em',
                            alignSelf: 'center',
                        }}>
                            Regenerate Password
                        </Button>
                    </Card>

                </div>
            </div>
        );
    }
}

export default withRouter(Form.create()(UserDetails));