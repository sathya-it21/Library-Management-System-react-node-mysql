const BookModel = require('../models/BookModel');

exports.createBook = async (req, res) => {
  try {
    const { title, author_id, publication_id, genre_id, is_available, isbn, quantity } = req.body;

    // Validate required fields
    if (!title || !author_id || !publication_id || !genre_id || isbn === undefined || quantity === undefined) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const remaining_quantity=quantity;
    const available = is_available ? 1 : 0;

    // Call the createBook function from BookModel
    const result = await BookModel.createBook(
      title,
      author_id,
      publication_id,
      genre_id,
      available,
      remaining_quantity,
      isbn,
      quantity
    );

    res.status(201).json({ message: 'Book created successfully', bookId: result.insertId });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Error creating book' });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.getAllBooksWithvalue=async(req,res)=>{
  console.log("get all books")
  try {
    const authors = await BookModel.getAllBooksWithvalue(); // Call the model function directly
    res.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
}

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.getBookById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ error: 'Error fetching book by ID' });
  }
};

exports.getBookByIsbn = async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await BookModel.getBookByIsbn(isbn);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error fetching book by ISBN:', error);
    res.status(500).json({ error: 'Error fetching book by ISBN' });
  }
};

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { title, author_id, publication_id, genre_id, isbn, quantity, is_available } = req.body;
  try {
    await BookModel.updateBookById(id, title, author_id, publication_id, genre_id, isbn, quantity, is_available);
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('Error updating book by ID:', error);
    res.status(500).json({ error: 'Error updating book by ID' });
  }
};

exports.deleteBookById = async (req, res) => {
  const { id } = req.params;
  try {
    await BookModel.deleteBookById(id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book by ID:', error);
    res.status(500).json({ error: 'Error deleting book by ID' });
  }
};




