import React, { Component } from 'react'
import './index.css';
import { NavLink } from 'react-router-dom';

export default class Landing extends Component {

    render() {
        return (
            <div>
                <div class="banner">
                    <div class="logo">
                        <img src="logo.png" alt="" />
                    </div>
                    <div class="title">
                        <h1>DEPARTMENTAL THESIS</h1>
                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, praesentium molestiae inventore.</h3>
                    </div>
                    <div class="action">
                        <hr />
                        <h1>Lorem ipsum dolor, sit amet consectetur adipi</h1>
                        <hr />
                    </div>
                    <div class="search">
                        <input type="search" />
                        <button>Search</button>
                    </div>
                </div>
                <div class="layer">
                    <div class="read">
                        <div class="book">
                            <img src="book1.png" alt="" />
                        </div>
                        <div class="info">
                            <h1>READ TO INSPIRE</h1>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora debitis ratione iure ut ullam, dolor hic magni consectetur incidunt eveniet nobis aut atque iste non repellendus recusandae officiis, a corporis.</p>
                            <div class="login">
                                <NavLink to='/auth/login' style={{color: 'purple'}}>Login</NavLink> to download
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}