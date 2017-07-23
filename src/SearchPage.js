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

  searchBooks = () => {
    BooksAPI.search(this.state.query).then((books) => {
      if(Array.isArray(books)) {
        let updatedBook = books.map((book) => {
          this.props.books.forEach((oldBook) => {
            if((oldBook.id === book.id) && (oldBook.title === book.title)) {
              book.shelf = oldBook.shelf
            } else {
              book.shelf = 'none'
            }
          })
          return book
        })
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
