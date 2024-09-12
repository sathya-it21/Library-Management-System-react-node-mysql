import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api'; // Import the configured axios instance
import styles from './styles/form.module.css'; // Import the common styles

const AddBooks = () => {
  const { id } = useParams(); // Get book ID from URL params
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [publicationId, setPublicationId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [isbn, setIsbn] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [publications, setPublications] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsData, publicationsData, genresData] = await Promise.all([
          axiosInstance.get('/authors'),
          axiosInstance.get('/publications'),
          axiosInstance.get('/genres'),
        ]);

        setAuthors(authorsData.data);
        setPublications(publicationsData.data);
        setGenres(genresData.data);

        if (id) {
          const response = await axiosInstance.get(`/books/${id}`);
          const book = response.data;
          setTitle(book.title);
          setAuthorId(book.author_id);
          setPublicationId(book.publication_id);
          setGenreId(book.genre_id);
          setIsbn(book.isbn);
          setQuantity(book.quantity);
          setIsAvailable(book.is_available);
        }
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !authorId || !publicationId || !genreId || !isbn || !quantity) {
      alert('All fields are required.');
      return;
    }

    try {
      if (id) {
        await axiosInstance.put(`/books/${id}`, {
          title,
          author_id: authorId,
          publication_id: publicationId,
          genre_id: genreId,
          is_available: isAvailable,
          isbn,
          quantity,
        });
        alert('Book updated successfully!');
      } else {
        await axiosInstance.post('/books', {
          title,
          author_id: authorId,
          publication_id: publicationId,
          genre_id: genreId,
          is_available: isAvailable,
          isbn,
          quantity,
        });
        alert('Book added successfully!');
      }
      navigate('/admin/manage-books');
    } catch (error) {
      console.error('Error saving book:', error.response ? error.response.data : error.message);
      alert('Error saving book: ' + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>{id ? 'Edit Book' : 'Add Book'}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Author:</label>
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
            className={styles.input}
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <button onClick={() => navigate('/admin/add/authors')}>Add new author</button>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Publication:</label>
          <select
            value={publicationId}
            onChange={(e) => setPublicationId(e.target.value)}
            required
            className={styles.input}
          >
            <option value="">Select a publication</option>
            {publications.map((pub) => (
              <option key={pub.id} value={pub.id}>
                {pub.name}
              </option>
            ))}
          </select>
        </div>


        <div className={styles.formGroup}>
          <button onClick={() => navigate('/admin/add/publications')}>Add new publication</button>
        </div>


        <div className={styles.formGroup}>
          <label className={styles.label}>Genre:</label>
          <select
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            required
            className={styles.input}
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          
        </div>
        <div className={styles.formGroup}>
          <button onClick={() => navigate('/admin/add/genres')}>Add new genre</button>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>ISBN:</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Available:</label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </div>
        <button type="submit" className={styles.button}>
          {id ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
