import React, { Component } from 'react';
import { message, Button, Card, Form, Icon } from 'antd';
import { withRouter, NavLink } from "react-router-dom";
import '../style.css';
import { http, handleErrors } from '../../services/http';

class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            name: '',
            email: '',
            newPassword: '',
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

    
    regeneratePassword() {
        http(
            `admin/users/${this.props.match.params.id}`,
            'PUT',
        )
        .then((r) => {
            message.success('Password Regenerated Successfully', 3)
            this.setState({
                newPassword: 'New Password: ' + r.data.message.password
            });
        })
        .catch((e) => {
            message.error(e.response.data.error)
            console.log(e)
        })
    }

    activateUser() {
        http(
            `admin/users/activate/${this.props.match.params.id}`,
            'PUT',
        )
        .then((r) => {
            message.success(r.data.message, 3).then(() => {
                window.document.location.reload();
            })
        })
        .catch((e) => {
            message.error(e.response.data.error)
            console.log(e)
        })
    }

    banUser() {
        http(
            `admin/users/ban/${this.props.match.params.id}`,
            'PUT',
        )
        .then((r) => {
            message.success(r.data.message, 3).then(() => {
                window.document.location.reload();
            })
        })
        .catch((e) => {
            message.error(e.response.data.error)
            console.log(e)
        })
    }

    deleteUser() {
        http(
            `admin/users/${this.props.match.params.id}`,
            'DELETE'
        )
        .then((r) => {
            message.success(r.data.message, 3).then(() => {
                this.props.history.push('/admin/users')
            })
        })
        .catch((e) => {
            message.error(e.response.data.error)
            console.log(e)
        })
    }

    
    componentDidMount() {
        this.getUser()
    }

    statusCheck() {
        if(this.state.status === 1) {
            return (
                <Button onClick={() => this.banUser()} style={{
                    marginTop: '2em',
                    alignSelf: 'center',
                }} type='danger'>
                    Ban
                </Button>
            );
        }

        return (
            <Button onClick={() =>this.activateUser()} style={{
                marginTop: '2em',
                alignSelf: 'center',
            }} type='primary'>
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
        return (
            <div>
                <div className="content">
                    <Card className="edit-note">
                        <h2> Manage User</h2> <Button> <NavLink to="/admin/users" style={{color: 'purple'}}><Icon type="caret-left" /> Go Back </NavLink></Button> <br />
                        <p>Name: {this.state.name}</p>
                        <p>Email: {this.state.email}</p>
                        
                        <Button onClick={() => this.regeneratePassword()} style={{
                            marginTop: '2em',
                            alignSelf: 'center',
                        }} type='ghost'>
                            Regenerate Password
                        </Button>
                        <hr />
                        {this.state.newPassword}
                        <hr />
                        {this.statusCheck()}
                        <hr />
                        <Button onClick={() => this.deleteUser()} style={{
                            marginTop: '2em',
                            alignSelf: 'center',
                        }} type='danger'>
                            Delete Account
                        </Button>
                    </Card>

                </div>
            </div>
        );
    }
}

export default withRouter(Form.create()(UserDetails));