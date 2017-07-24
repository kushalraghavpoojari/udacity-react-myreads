import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import _ from 'lodash'

class Search extends Component {
  state = {
    query: '',
    bookSearch : []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.delayFetch()
  }

  getUniqueBooks = (books) => {
    const bookIds = new Set()
    const uniqueBooks = []
    books.forEach((book) => {
      if(!bookIds.has(book.id)) {
        uniqueBooks.push(book)
        bookIds.add(book.id)
      }
    })
    return uniqueBooks
  }

  checkShelf = (books) => {
    const bookIds = new Set(this.props.books.map((book) => book.id))
    return books.map((book) => {
      if (bookIds.has(book.id)) {
        return this.props.books.find((propBook) => propBook.id === book.id)
      } else {
        book.shelf = "none"
        return book
      }
    })
  }

  searchBooks = () => {
    BooksAPI.search(this.state.query).then((books) => {
      if(Array.isArray(books)) {
        let updatedBook = this.checkShelf(this.getUniqueBooks(books))
        this.setState({bookSearch: updatedBook})
      } else {
        this.setState({bookSearch: []})
      }
    })
  }


  componentWillMount() {
    this.setState({bookSearch: []})
    this.delayFetch = _.debounce(this.searchBooks, 500)
  }

  render () {
    const {bookSearch, query} = this.state
    const {onUpdateBook} = this.props

    return (
      <div className="search-books root">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              (bookSearch.length !== 0) && bookSearch.map(book => (
                <div key={book.id}>
                  <Book book={book} update={onUpdateBook} />
                </div>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
