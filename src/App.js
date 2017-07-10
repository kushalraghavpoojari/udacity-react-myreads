import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, history } from 'react-router-dom'
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

  updateBook = (book,shelf) => {
    // BooksAPI.update(book, shelf).then(books => {
    //   Object.keys(books).forEach((key)  =>{
    //     books[key].map((book) => {
    //       BooksAPI.get(book).then((book) => {
    //         this.setState(state => {state.books.concat([book])})
    //         console.log(this.state.books)
    //       })
    //     })
    //   })
    // })
    console.log('test')
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState({books})
      })
    })
  }

  // searchBook = (query) => {
  //   if(query.trim() !== '') {
  //     BooksAPI.search(query, 20).then(books => this.setState({books})).catch(error => console.error(error))
  //   }
  // }

  render() {
    if(!this.state.books.length) {
      return <div className="splash"> Loading... </div>
    }
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage books={this.state.books}
            onUpdateBook={this.updateBook}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search onUpdateBook={this.updateBook} books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
