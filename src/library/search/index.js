import React, { Component } from "react";
import "./index.css";
import BookCover from "../book_cover";
import { http } from "../../services/http";
import { Row, Col, Spin } from "antd";
import { NavLink } from 'react-router-dom';
import logo from '../../logo.png';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: <Spin className='spinner'/>,
      author: '',
      category_id: '',
      session_id: '',
      tittle: '',
      categories: [],
      sessions: [],
    };
    this.renderCategories()
    this.renderSessions()
  }

  getSearchResult() {
    
    let params = '';
    if(localStorage.getItem('search') !== null) {
      params += `&tittle=${localStorage.getItem('search')}`
    }
    if(this.state.tittle !== '') {
      params += `&tittle=${this.state.tittle}`
    }
    if(this.state.author !== '') {
      params += `&author=${this.state.author}`
    }
    if(this.state.category_id !== '') {
      params += `&category_id=${this.state.category_id}`
    }
    if(this.state.session_id !== '') {
      params += `&session_id=${this.state.session_id}`
    }

    http(
      `students/books?${params}`,
      'GET',
    )
    .then((r) => {
      this.renderBooks(r.data.message);
      localStorage.removeItem('search')
    })
  }

  componentWillMount(){
    console.log(localStorage.getItem('search'))
    if(localStorage.getItem('search') !== null) {
      this.getSearchResult();
      return;
    }
    http(
      'students/books'
    )
    .then((r) => {
        console.log(r);
        this.renderBooks(r.data.message);
    })
    .catch((e) => {
        console.log(e);
    })
  }

  renderBooks(books) {
    let array = books;
    if(array.lenght < 1 || array === undefined) {
        this.setState({
            books: 
            <div> 
                No books found
            </div>,
        });
        return;
    }

    let a = array.map((r, i) => 
        <BookCover key={i} book={r} />
    );
    console.log(a)
    this.setState({
        books: a,
    });
  }

  renderCategories() {
    http(
      'misc/categories'
    )
    .then((r) => {
      console.log(r)
      localStorage.setItem('categories', r.data.message);
      let options = r.data.message.map((e, i) =>
        <option value={e.id} key={i}>
          {e.name}
        </option>
      );
      this.setState({
        categories: options,
      })
    })
  }

  authView() {
    if(localStorage.getItem('token') === null) {
      return (
        <NavLink className="logout" to={'/auth/login'}>
          Login
        </NavLink>
      )
    }
    return (
      <NavLink className="logout" to={'/auth/logout'}>
        Logout
      </NavLink>
    )
  }
  renderSessions() {
    http(
      'misc/sessions'
    )
    .then((r) => {
      console.log(r)
      localStorage.setItem('sessions', r.data.message);
      let options = r.data.message.map((e, i) =>
        <option value={e.id} key={i}>
          {e.name}
        </option>
      );
      this.setState({
        sessions: options,
      })
    })
  }

  renderFavorites() {
    http(
      'misc/favorites'
    )
    .then((r) => {
      console.log(r)
      let a = r.data.message.map((r, i) => 
        <li>
          <NavLink to={`/favorite/${r.id}`}>
            {}
          </NavLink>
        </li>
      );
    })
  }

  render() {
    return (
      <div>
        <div className='module'>
          <div className='top-nav'>
            <nav>
              <div className='brand'>
                {/* <h2>LIBRARY</h2> */}
                <div className='user'>
                  <NavLink to='/'>
                    <img src={logo} alt='' />
                    </NavLink>
                </div>
                <br />
                {this.authView()}
              </div>
              <div className='search'>
                <div className='row-one'>
                  <div className='form'>
                    <input type='text' placeholder='Title' onChange={(e) => this.setState({tittle: e.target.value})}/>
                  </div>
                  <div className='form'>
                    <select onChange={(e) => this.setState({session_id: e.target.value})}>>
                      <option>
                        Select Session
                      </option>
                      {this.state.sessions}
                    </select>
                  </div>
                  <div className='form'>
                    <button type='submit' onClick={() => this.getSearchResult()}>Search</button>
                  </div>
                </div>
                <div className='row-two'>
                  <div className='form'>
                    <input type='text' placeholder='Author' onChange={(e) => this.setState({author: e.target.value})} />
                  </div>
                  <div className='form'>
                    <select onChange={(e) => this.setState({category_id: e.target.value})}>
                      <option>
                        Select Category
                      </option>
                      {this.state.categories}
                    </select>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className='side-nav'>
            <div className='group'>
              <div className='title'>
                {/* <h5>BOOKS</h5> */}
              </div>
              <div className='links'>
                <ul>
                  {this.state.favorites}
                </ul>
              </div>
            </div>
          </div>
          <div className='card-module'>
            <div className='module-body'>
                <div className='document'>
                  {this.state.books}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
