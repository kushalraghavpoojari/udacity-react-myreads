import React, { Component } from 'react'
import { Link }from 'react-router-dom'
import shelves from './Shelves'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import './App.css'

class MainPage extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
     const { books} = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {
            shelves.map( (shelf) => (
              <BookShelf key={shelf.id} title={shelf.title} update={this.props.onUpdateBook}
                books={books.filter((book) => (book.shelf === shelf.id))}/>
            ))
          }
        </div>
        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MainPage
