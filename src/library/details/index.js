import React, { Component } from 'react';
import './index.css';
import { Spin } from 'antd';
import { http } from '../../services/http';

class Details extends Component {

  constructor(props) {
      super(props);
      this.state = {
        details: <Spin className='spinner' size='large'/>,
      }
  }

  process_name(string, limit) {
    if(string.length > limit) {
      return this.props.book.author.substring(0, 10) + '...'
    }
    return string;
  }

  componentDidMount() {
    this.getDetails();
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
          <div class="details">
           <div className="back">
              <button>Back to library</button>
           </div>
          <h4>{d.tittle}</h4>
            <p dangerouslySetInnerHTML={{__html: d.abstract}}></p>
            
          </div>
            
        </div>;

        this.setState({details: a});
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
