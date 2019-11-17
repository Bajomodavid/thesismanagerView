import React, { Component } from "react";
import "./index.css";
import BookCover from "../book_cover";
import { http } from "../../services/http";
import { Row, Col } from "antd";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentWillMount(){
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
    })
  }

  renderFavorites() {

  }

  render() {
    return (
      <div>
        <div className='module'>
          <div className='top-nav'>
            <nav>
              <div className='brand'>
                <h2>LIBRARY</h2>
                <div className='user'>
                  <img src='avatar.jpg' alt='' />
                  Aziz
                </div>
              </div>
              <div className='search'>
                <div className='row-one'>
                  <div className='form'>
                    <input type='text' placeholder='Title' />
                  </div>
                  <div className='form'>
                    <select name='' id=''>
                      <option value='' selected>
                        Session
                      </option>
                    </select>
                  </div>
                  <div className='form'>
                    <button type='submit'>Search</button>
                  </div>
                </div>
                <div className='row-two'>
                  <div className='form'>
                    <input type='text' placeholder='Title' />
                  </div>
                  <div className='form'>
                    <select name='' id=''>
                      <option selected value='Category'>
                        None
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className='side-nav'>
            <div className='group'>
              <div className='title'>
                <h5>CATEGORY</h5>
              </div>
              <div className='links'>
                <ul>
                  <li>Category 1</li>
                  <li>Category 2</li>
                  <li>Category 3</li>
                  <li>Category 4</li>
                </ul>
              </div>
            </div>
            <div className='group'>
              <div className='title'>
                <h5>BOOKS</h5>
              </div>
              <div className='links'>
                <ul>
                  <li>Book 1</li>
                  <li>Book 2</li>
                  <li>Book 3</li>
                  <li>Book 4</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='card-module'>
            <div className='module-body'>
              <Col span={4}>
                {this.state.books}
              </Col>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
