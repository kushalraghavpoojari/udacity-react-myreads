import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route} from 'react-router-dom'
import Search from './SearchPage'
import MainPage from './MainPage'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }



  updateBook = (updatedBook,shelf) => {
    updatedBook.shelf = shelf
    this.setState((state) => ({
      books: state.books.filter(
        (book) => book.id !== updatedBook.id).concat([updatedBook])
    }))
    BooksAPI.update({id: updatedBook.id}, shelf).then(()=>{
      BooksAPI.getAll()
    })
  }

  render() {
    if(!this.state.books.length) {
      return <div className="splash"> Loading... </div>
    }
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage books={this.state.books}
            onUpdateBook={this.updateBook} />
        )}/>
        <Route exact path='/search' render={() => (
          <Search onUpdateBook={this.updateBook} books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
