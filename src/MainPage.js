import React, { Component } from 'react'
import Book from './Book'
import { Link }from 'react-router-dom'
import PropTypes from 'prop-types'
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
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {
                  books.filter((book) => (book.shelf === 'currentlyReading')).map((book) => (
                    <div key={book.id}>
                      <Book book={book} update={this.props.onUpdateBook} />
                    </div>
                  ))
                }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want To Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {
                  books.filter((book) => (book.shelf === 'wantToRead')).map((book) => (
                    <div key={book.id}>
                      <Book book={book} update={this.props.onUpdateBook} />
                    </div>
                  ))
                }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {
                  books.filter((book) => (book.shelf === 'read')).map((book) => (
                    <div key={book.id}>
                      <Book book={book} update={this.props.onUpdateBook} />
                    </div>
                  ))
                }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MainPage
