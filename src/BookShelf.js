import React, { Component } from 'react';
import Book from './Book'

class BookShelf extends Component {

  render() {
    const {books,update} = this.props
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                books.map((book) => (
                  <div key={book.id}>
                    <Book book={book} update={update}/>
                  </div>
                ))
              }
            </ol>
          </div>
        </div>
      </div>
    );
  }

}

export default BookShelf;
