import React, { Component } from 'react';
import { Table, Button } from 'antd';
import '../style.css';
import { NavLink } from "react-router-dom";
import { http } from '../../services/http';
let time = require("moment");

const columns = [{
    title: 'No',
    dataIndex: 'position',
    width: 150,
  }, {
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Email',
    dataIndex: 'email',
  }, {
    title: 'Created On',
    dataIndex: 'created',
  }, {
    title: 'Actions',
    dataIndex: 'updated',
  }];

  
export default class ManageUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pending: 0,
            paid: 0,
            completed_investments: 0,
            loading: true,
            loadingTab: true,
            data: [],
        }
    }
    getAll() {
        let data = [];
        http(
            'admin/users',
        )
        .then((r) => {
            console.log(r)
            let d = r.data.message;
            for(let i=0; d.length > i; i++){
                data.push({
                    key: i,
                    position:i+1,
                    name: d[i].name,
                    email: d[i].email,
                    created:  time(d[i].created_at).format("ddd, DD MMM YYYY, hh:mm:ss a"),
                    updated:  <NavLink to={`/admin/user/update/${d[i].id}`}>
                                <Button>View</Button>
                            </NavLink>,
                    
                });
            }
            this.setState({
                data: data,
                loadingTab: false,
            })

        })
        .catch((e) => {
            console.log(e)
        })
    }

    componentDidMount() {
        this.getAll()
    }

    render() {
        return (
            <div>
                <NavLink to='/admin/user/create'>
                  <Button style={{
                    marginTop: '2em',
                    marginLeft: '40em',
                    width: '20em'
                  }}>
                    Create new User
                  </Button>
                </NavLink>
                <div className="table"> 
                 <Table columns={columns} dataSource={this.state.data} pagination={{ pageSize: 20 }} loading={this.state.loadingTab}/>
                </div>
            </div>
        );
    }
}