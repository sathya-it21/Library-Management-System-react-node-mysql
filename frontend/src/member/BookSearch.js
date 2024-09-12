import React, { useState, useEffect } from 'react';
import axiosInstance from '../api'; 
import tableStyles from '../styles/table.module.css';
import searchStyles from './styles/booksearch.module.css';

const BookSearch = () => {
  const [searchParams, setSearchParams] = useState({
    title: '',
    authorName: '',
    genreName: '',
    isbn: ''
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });

  const fetchBooks = async (page = 1) => {
    try {
      const response = await axiosInstance.get('/search', {
        params: { ...searchParams, page, limit: pagination.limit }
      });
      setResults(response.data.books);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError('Error fetching search results');
      console.error('Search error:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  const handleSearch = () => {
    fetchBooks(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBooks(newPage);
    }
  };

  const getUserId = () => {
    return localStorage.getItem('userId');
  };

  const handleRequestBook = async (bookId) => {
    try {
      const userId = getUserId();
      await axiosInstance.post('/request', {
        userId,
        bookId
      });
      alert('Book request submitted successfully!');
    } catch (error) {
      console.error('Error requesting book:', error);
    }
  };

  return (
    <div className={searchStyles.searchBooksContainer}>
      <h2>Search Books</h2>
      <form className={searchStyles.searchBooksForm} onSubmit={(e) => e.preventDefault()}>
        <div className={searchStyles.formField}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={searchParams.title}
            onChange={handleChange}
          />
        </div>
        <div className={searchStyles.formField}>
          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            value={searchParams.authorName}
            onChange={handleChange}
          />
        </div>
        <div className={searchStyles.formField}>
          <input
            type="text"
            name="genreName"
            placeholder="Genre Name"
            value={searchParams.genreName}
            onChange={handleChange}
          />
        </div>
        <div className={searchStyles.formField}>
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={searchParams.isbn}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className={searchStyles.searchButton}
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
      {error && <div className={searchStyles.errorMessage}>{error}</div>}
      {results.length > 0 && (
        <>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Publication</th>
                <th>ISBN</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.authorName}</td>
                  <td>{book.genreName}</td>
                  <td>{book.publicationName}</td>
                  <td>{book.isbn}</td>
                  <td>
                    {book.is_available ? (
                      <button 
                        className={tableStyles.button}
                        onClick={() => handleRequestBook(book.id)}
                      >
                        Request Book
                      </button>
                    ) : (
                      'Not Available'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={searchStyles.paginationControls}>
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </button>
            <span>Page {pagination.page} of {pagination.totalPages}</span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
      {results.length === 0 && !error && <p>No results found</p>}
    </div>
  );
};

export default BookSearch;
