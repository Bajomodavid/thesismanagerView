import React, { Component } from 'react';
import { Route } from "react-router-dom";
import ManageBooks from '../management/books';
import BookDetails from '../management/books/details';
import CreateBook from '../management/books/create';
import ManageCategories from '../management/categories';
import CategoryDetails from '../management/categories/details';
import CreateCategory from '../management/categories/create';
import ManageSessions from '../management/sessions';
import SessionDetails from '../management/sessions/details';
import CreateSession from '../management/sessions/create';
import ManageUsers from '../management/users';
import UserDetails from '../management/users/details';
import CreateUser from '../management/users/create';

export default class AdminRoutes extends Component {
    render() {
        return(
            <div>
                <Route exact path="/admin/books" component={ManageBooks}/>
                <Route exact path="/admin/books/update/:id" component={BookDetails}/>
                <Route exact path="/admin/books/create" component={CreateBook}/>
                <Route exact path="/admin/category" component={ManageCategories}/>
                <Route path="/admin/category/update/:id" component={CategoryDetails}/>
                <Route exact path="/admin/category/create" component={CreateCategory}/>
                <Route exact path="/admin/session" component={ManageSessions}/>
                <Route path="/admin/session/update/:id" component={SessionDetails}/>
                <Route exact path="/admin/session/create" component={CreateSession}/>
                <Route exact path="/admin/users" component={ManageUsers}/>
                <Route path="/admin/user/update/:id" component={UserDetails}/>
                <Route exact path="/admin/user/create" component={CreateUser}/>
            </div>
        )
    }
}

