import React, { Component } from 'react';
import './index.css';
import { Spin } from 'antd';
import { http, baseUrl, httpDownload } from '../../services/http';
import { NavLink } from 'react-router-dom';

class Details extends Component {

  constructor(props) {
      super(props);
      this.state = {
        details: <Spin className='spinner' size='large'/>,
        book: '',
      }
  }

  process_name(string, limit) {
    if(string.length > limit) {
      return this.props.book.author.substring(0, 10) + '...'
    }
    return string;
  }

  getFile() {
    httpDownload(
      `students/books/download/${this.props.match.params.book}`
    )
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', this.getFileName()); //or any other extension
      document.body.appendChild(link);
      link.click();
    })

  }

  downloadLink() {
    if(localStorage.getItem('token') !== null) {
      return (
        <button className='download-button' onClick={() => this.getFile()}>
          Download Thesis
        </button>
      )
    }

    return (
      <NavLink to='/auth/login' style={{color: 'purple'}}>
        <button className='download-button'>
            Login to Download
        </button>
      </NavLink>
    )
  }
  componentDidMount() {
    this.getDetails();
  }

  getFileName() {
    var slug = this.state.book.url.split('.').pop();
    return this.state.book.tittle + '.' + slug;
  }
  
  getDetails() {
    http(
      `students/books/${this.props.match.params.book}`
    )
    .then((r) => {
        console.log(r)
        let d = r.data.message;
        let a = 
        <div>
          <div className="single-detail">
           <div className="back">
              <NavLink to='/search'><button>Back to library</button></NavLink>
           </div>
           <p><b>Author:</b> {d.author}</p>
           <div className="category">
              <h3>{d.session.name} | { d.category.name}</h3>
              <h1>{d.tittle}</h1>
           </div>
            <p dangerouslySetInnerHTML={{__html: d.abstract}}></p>
            {this.downloadLink()}
          </div>
            
        </div>;
        this.setState({details: a, book: d,});
    })
  }

  render() {
    return (
        <div className="">
            {this.state.details}
        </div>
    );
  }
}

export default Details;
