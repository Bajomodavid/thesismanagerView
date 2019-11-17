import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Landing from '../home/landing';

export default class StudentRoutes extends Component {
    render() {
        return(
            <div>
                <Route path="/" component={Landing}/>
            </div>
        )
    }
}

