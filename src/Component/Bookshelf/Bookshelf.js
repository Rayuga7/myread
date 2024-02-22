import React, { Component } from "react";
import Book from "./Book/Book";
import './Bookshelf.css';

class Bookshelf extends Component {
  render() {
    const { books, shelfTitle } = this.props;

    // Map through the books and create a list of Book components
    const listOfBooks = books.map((book) => (
      <li key={book.id}>
        <Book
          book={book}
          bookTitle={book.title}
          bookAuthor={book.authors ? book.authors[0] : "Unknown Author"}
          bookCover={book.imageLinks ? book.imageLinks.thumbnail : ""}
          changeShelf={this.props.changeShelf}
        />
      </li>
    ));

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {listOfBooks}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
