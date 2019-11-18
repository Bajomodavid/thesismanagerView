import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import StudentFooter from './footer';
import './style.css';
import logo from '../logo.png';
import AdminRoutes from '../routes/admin';

const {
  Header, Sider,
} = Layout;


class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.data = JSON.parse(localStorage.getItem("user"));
        this.username = "";
        if(this.data !== undefined && this.data !== null) {
            this.username = this.data.username
        }
        this.state = {
            key: "investor/investments",
            hide: true
        }
    }

    verify() {
        console.log(localStorage.getItem('allowed'))
        if(localStorage.getItem('token') === null) {
            
            this.props.history.push('/auth/login')
        }
        if(localStorage.getItem('role') !== 'admin' || localStorage.getItem('allowed') !== '1') {
            this.props.history.push('/search')
        }
    }
    componentDidMount() {
        this.triggerSideBar()
        
        setTimeout(this.verify(), 3000);
    }

    switch() {
        this.setState({hide: !this.state.hide})
    }

    triggerSideBar() {
        if(window.innerWidth < 768) {
            this.setState({margin: 0});
        } else {
            this.setState({margin: "5%"});
        }
    }

    render() {
        const menu = (
            <Menu>
              <Menu.Item>
                <Icon type="logout"/><span><NavLink style={{color: 'purple'}} to="/auth/logout">Logout</NavLink></span>
              </Menu.Item>
            </Menu>
          );
        return (
            
                <Layout>
                    <Sider style={{
                        overflow: 'auto', height: '100vh', position: 'sticky', left: 0,
                        }}
                        className="sider"
                        breakpoint="md"
                        collapsedWidth={this.state.margin}
                        collapsed={this.state.hide}
                        onBreakpoint={() => { this.triggerSideBar(); }}
                        onCollapse={() => { this.triggerSideBar(); }}
                    >
                        <div className='dashboard-logo-area'>
                            <NavLink to='/'>{<img className='dashboard-logo' src={logo} alt='Logo'/>}</NavLink>
                        </div>
                        <Menu theme="dark" mode="inline" selectedKeys={[this.props.location.pathname]}>
                            <Menu.Item key="/admin/books">
                            <NavLink style={{color: "#fff"}} to="/admin/books">
                            <Icon type="book" />
                            <span className="nav-text">Thesis</span>
                            </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/admin/category">
                            <NavLink style={{color: "#fff"}} to="/admin/category">
                            <Icon type="unordered-list" />
                            <span className="nav-text">Category</span>
                            </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/admin/session">
                            <NavLink style={{color: "#fff"}} to="/admin/session">
                            <Icon type="clock-circle" />
                            <span className="nav-text">Sessions</span>
                            </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/admin/users">
                            <NavLink style={{color: "#fff"}} to="/admin/users">
                            <Icon type="user-add" />
                            <span className="nav-text">Users</span>
                            </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>

                    <Layout>
                    <Header style={{ background: '#fff', padding: 0, }}>
                        {<Icon type={this.state.hide ? 'menu-unfold' : 'menu-fold'} className="trigger" onClick={() => this.switch()}/>}
                        <span style={{float: "right", marginRight: "4%"}}> 
                            <Dropdown overlay={menu} trigger={['click']}>
                                <div>
                                    <Avatar size="large" icon="user" src={``}/>
                                    <span style={{marginLeft: 5, marginRight: 5}}>{this.username}</span>
                                    <Icon type="down" />
                                </div>
                            </Dropdown>
                        </span>
                    </Header>
                        <div>
                            <AdminRoutes />
                        </div>
                        <StudentFooter />
                    </Layout>
                </Layout>
            
        );
    }
}

export default withRouter(AdminDashboard);