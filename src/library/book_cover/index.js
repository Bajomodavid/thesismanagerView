import React, { Component } from 'react';
import './index.css';
import { Card } from 'antd';

class BookCover extends Component {

  constructor(props) {
      super(props);
      this.state = {
        books: [],
      }
  }

  process_name(string, limit) {
    if(string.length > limit) {
      return this.props.book.author.substring(0, 10) + '...'
    }
    return string;
  }

  render() {
    return (
        <div className="card">
            <div className="details">
                <p className="title">{this.props.book.tittle}</p>
                <p className="Inst"></p>
                <p className="type">{this.props.book.category.name}</p>
            </div>
            <div className="info">
                <div className="name">{this.process_name(this.props.book.author, 12)}</div>
                <div className="dept">{this.process_name(this.props.book.department.name, 20)}</div>
            </div>
        </div>
    );
  }
}

export default BookCover;
