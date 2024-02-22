import React, { Component } from "react";
import './SearchBar.css'
import Bookshelf from "../Bookshelf/Bookshelf";
import * as BooksAPI from '../../BooksAPI';
import searchTerms from '../../st';



class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: [],
            suggestions: [] // State for storing search suggestions
        };
    }

    // Function to handle input change
    handleInputChange = (event) => {
        const userInput = event.target.value;
        this.setState({
            query: userInput,
            // Filter predefined search terms based on user input for suggestions
            suggestions: searchTerms.filter(term =>
                term.toLowerCase().includes(userInput.toLowerCase())
            )
        });
    };

    // Function to handle selection of a suggestion
    handleSuggestionClick = (suggestion) => {
        this.setState({ query: suggestion, suggestions: [] });
    };

    searchBooksHandler = () => {
        // Perform search and update books state
        BooksAPI.search(this.state.query)
            .then((matchedBooks) => {
                if (matchedBooks.error) {
                    this.setState({ books: [] })
                } else {
                    this.setState({ books: matchedBooks })
                }
            })
            .catch(error => {
                console.error('Error searching books:', error);
                this.setState({ books: [], error: 'An error occurred while searching.' });
            });
    }

    render() {
        const { query, books, suggestions } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a
                        className="close-search"
                        onClick={this.props.closeSearchBar}
                    >
                        Close
                    </a>
                    <div className="search-books-input-wrapper">
                        <input
                            onChange={this.handleInputChange}
                            value={query}
                            type="text"
                            placeholder="Search by title, author, or ISBN"
                        />
                    </div>

                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.slice(0, 5).map((suggestion, index) => (
                                <li key={index} onClick={() => this.handleSuggestionClick(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
                <button className="searchButton" onClick={this.searchBooksHandler}>Search</button>
                <Bookshelf changeShelf={this.props.changeShelf} books={books} shelfTitle="Searched Books" />
            </div>
        )
    }
}

export default SearchBar;
