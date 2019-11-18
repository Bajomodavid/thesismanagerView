import React, { Component } from 'react'
import './index.css';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.png';
import { Button } from 'antd';

export default class Landing extends Component {

    setSearch(value) {
        console.log(value);
        localStorage.setItem('search', value)
    }
    render() {
        return (
            <div>
                <div class="banner">
                    <div class="logo">
                        <img src={logo} alt="" />
                    </div>
                    <div class="title">
                        <h1>DEPARTMENT OF CYBER SECURITY SCIENCE</h1>
                        <h3>.</h3>
                    </div>
                    <div class="action">
                        <hr />
                        <h1>Secure automated thesis storage management system.</h1>
                        <hr />
                    </div>
                    <div class="search">
                        <input type="search" onChange={(e) => this.setSearch(e.target.value)}/>
                        <NavLink to='/search'>
                            <Button type='ghost' style={{
                                width: '10em',
                            }}>
                                Search
                            </Button>
                    </NavLink>
                    </div>

                    <NavLink to='/search'>
                        <Button type='ghost' style={{
                            color: '#fff',
                            width: '15em',
                        }}>
                            Advanced Search
                        </Button>
                    </NavLink>
                </div>
                <div class="layer">
                    <div class="read">
                        <div class="book">
                            <img src="book1.png" alt="" />
                        </div>
                        <div class="info">
                            <h1>READ TO INSPIRE</h1>
                            {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora debitis ratione iure ut ullam, dolor hic magni consectetur incidunt eveniet nobis aut atque iste non repellendus recusandae officiis, a corporis.</p> */}
                            <div class="">
                                <NavLink to='/auth/login' style={{color: ''}}><Button>Login to download</Button></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}