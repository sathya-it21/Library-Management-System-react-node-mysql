const AuthorModel = require('../models/AuthorModel');

exports.createAuthor = async (req, res) => {
  const { name,biography } = req.body;
  try {
    const authorId = await AuthorModel.createAuthor(name,biography);
    res.status(201).json({ id: authorId });
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ error: 'Error creating author' });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorModel.getAllAuthors(); // Call the model function directly
    res.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
};



exports.getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await AuthorModel.getAuthorById(id);
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    console.error('Error fetching author by ID:', error);
    res.status(500).json({ error: 'Error fetching author by ID' });
  }
};

exports.updateAuthorById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const {biography} = req.body;

  console.log(`${id},${name},${biography}`)

  try {
    await AuthorModel.updateAuthorById(id, name,biography);
    res.status(200).json({ message: 'Author updated successfully' });
  } catch (error) {
    console.error('Error updating author by ID:', error);
    res.status(500).json({ error: 'Error updating author by ID' });
  }
};

exports.deleteAuthorById = async (req, res) => {
  const authorId = req.params.id;

  try {
    const result = await AuthorModel.deleteAuthorById(authorId);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred while deleting the author.' });
  }
};
