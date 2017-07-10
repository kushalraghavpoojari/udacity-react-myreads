import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
  }

  render () {
    const {book, update} = this.props
    console.log(book)
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193,boxShadow: `10px 10px 5px #888888`, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={ (e) => update(book,e.target.value) }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {
              (book.authors) && book.authors.map((author) => (
                <span key={author}>
                  {author}
                </span>
              ))
            }
          </div>
        </div>
      </li>

    )
  }
}

export default Book
