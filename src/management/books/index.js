import React, { Component } from 'react';
import { Table, Badge, Button } from 'antd';
import '../style.css';
import { NavLink } from "react-router-dom";
import { http } from '../../services/http';
let time = require("moment");

const columns = [{
    title: 'No',
    dataIndex: 'position',
    width: 150,
  }, {
    title: 'Title',
    dataIndex: 'tittle',
  }, {
    title: 'Author',
    dataIndex: 'author',
  }, {
    title: 'Department',
    dataIndex: 'department',
  }, {
    title: 'Type',
    dataIndex: 'type',
  }, {
    title: 'Session',
    dataIndex: 'session',
  }, {
    title: 'Category',
    dataIndex: 'category',
  }, {
    title: 'Created On',
    dataIndex: 'created',
  }, {
    title: 'Actions',
    dataIndex: 'updated',
  }];

  
export default class ManageBooks extends Component {

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
            'admin/books',
        )
        .then((r) => {
            console.log(r)
            let d = r.data.success;
            for(let i=0; d.length > i; i++){
                let type = d[i].public === 1 ? <Badge status='success'>Public</Badge> : <Badge status='error'>Protected</Badge>;
                data.push({
                    key: i,
                    position:i+1,
                    tittle: d[i].tittle,
                    author: d[i].author,
                    department: d[i].department.name,
                    type: type,
                    session: d[i].session.name,
                    category: d[i].category.name,
                    created:  time(d[i].created_at).format("ddd, DD MMM YYYY, hh:mm:ss a"),
                    updated:  <NavLink to={`/admin/books/update/${d[i].id}`}>
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
                <NavLink to='/admin/books/create'>
                  <Button style={{
                    marginTop: '2em',
                    marginLeft: '40em',
                    width: '20em'
                  }}>
                    Upload New Thesis
                  </Button>
                </NavLink>
                <div className="table"> 
                 <Table columns={columns} dataSource={this.state.data} pagination={{ pageSize: 20 }} loading={this.state.loadingTab}/>
                </div>
            </div>
        );
    }
}