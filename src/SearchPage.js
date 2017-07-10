import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import _ from 'lodash'
//import escapeRegExp from 'escape-string-regexp'

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
        this.setState({bookSearch: books.concat(this.props.books)})
      } else {
        this.setState({bookSearch: []})
      }
    })
  }


  componentWillMount() {
    this.setState({bookSearch: this.props.books})
    this.delayFetch = _.debounce(this.searchBooks, 500)
  }

  render () {
    const {bookSearch, query} = this.state
    const {onUpdateBook, books} = this.props
    // //console.log(books)
    // let showingBooks
    // if(query) {
    //   let match = new RegExp(escapeRegExp(query, 'i'))
    //   console.log(this.state.bookSearch)
    //   let tempBooks = this.state.bookSearch.filter(book=>match.test(book.title) || match.test(book.author))
    //   showingBooks = tempBooks ? tempBooks : books
    // } else {
    //   showingBooks = books
    //console.log(this.state.bookSearch)
    // }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query}
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
