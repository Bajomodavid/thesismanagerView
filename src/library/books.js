import React, { Component } from 'react';
// import { Button } from "semantic-ui-react";

const books = [
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  {
      name: 'Title is an overrated object defined by the complexiy of the mind of the authoe :)',
      author: 'Achilles',
      description: 'Description'
  },
  
];

class LibraryBooks extends Component {

  constructor(props) {
      super(props);
      this.state = {
        books: [],
      }
  }

  componentDidMount() {
    this.renderBooks()
  }

  renderBooks() {
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
        <div className='book-thumbnail' key={i}>
            <p className='project-title-thumb'>{r.name}</p>
            <p className='by'>BY</p>
            <p className='project-author-thumb'>{r.author}</p>
            {/* <Button theme="secondary">Secondary</Button> */}
        </div>
    );
    console.log(a)
    this.setState({
        books: a,
    });
  }

  render() {
    return (
        <div className='library-books'>
            {this.state.books}
        </div>
    );
  }
}

export default LibraryBooks;
