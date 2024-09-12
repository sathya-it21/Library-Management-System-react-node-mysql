const GenreModel = require('../models/GenreModel');

exports.createGenre = async (req, res) => {
  const { name } = req.body;
  try {
    const genreId = await GenreModel.createGenre(name);
    res.status(201).json({ id: genreId });
  } catch (error) {
    console.error('Error creating genre:', error);
    res.status(500).json({ error: 'Error creating genre' });
  }
};

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await GenreModel.getAllGenres(); // Call the model function directly
    res.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
};

exports.getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await GenreModel.getGenreById(id);
    if (genre) {
      res.json(genre);
    } else {
      res.status(404).json({ error: 'Genre not found' });
    }
  } catch (error) {
    console.error('Error fetching genre by ID:', error);
    res.status(500).json({ error: 'Error fetching genre by ID' });
  }
};

exports.updateGenreById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await GenreModel.updateGenreById(id, name);
    res.status(200).json({ message: 'Genre updated successfully' });
  } catch (error) {
    console.error('Error updating genre by ID:', error);
    res.status(500).json({ error: 'Error updating genre by ID' });
  }
};

exports.deleteGenreById = async (req, res) => {
  const genreId = req.params.id;

  try {
    const result = await GenreModel.deleteGenreById(genreId);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred while deleting the genre.' });
  }
};
