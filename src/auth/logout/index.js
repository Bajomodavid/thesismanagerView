import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {

   
    componentDidMount() {
        localStorage.clear()
        // Navigate
        this.props.history.push('/auth/login')
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default withRouter(Logout);
