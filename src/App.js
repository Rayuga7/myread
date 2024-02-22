import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from './BooksAPI';
import Bookshelf from "./Component/Bookshelf/Bookshelf";
import SearchBar from "./Component/SearchBar/SearchBar";

function App() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setAllBooks(res);
    };
    getBooks();
  }, []);

  const changeShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    const updatedBooks = await BooksAPI.getAll();
    setAllBooks(updatedBooks);
  };

  const closeSearchBar = () => {
    setShowSearchPage(false);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchBar changeShelf={changeShelf} closeSearchBar={closeSearchBar} books={allBooks} />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf
                books={allBooks.filter(book => book.shelf === 'currentlyReading')}
                shelfTitle="Currently Reading"
                changeShelf={changeShelf}
              />
              <Bookshelf
                books={allBooks.filter(book => book.shelf === 'wantToRead')}
                shelfTitle="Want to Read"
                changeShelf={changeShelf}
              />
              <Bookshelf
                books={allBooks.filter(book => book.shelf === 'read')}
                shelfTitle="Read"
                changeShelf={changeShelf}
              />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchPage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
