const PublicationModel = require('../models/PublicationModel');

exports.createPublication = async (req, res) => {
  const { name } = req.body;
  try {
    const publicationId = await PublicationModel.createPublication(name);
    res.status(201).json({ id: publicationId });
  } catch (error) {
    console.error('Error creating publication:', error);
    res.status(500).json({ error: 'Error creating publication' });
  }
};

exports.getAllPublications = async (req, res) => {
  try {
    const  publications= await PublicationModel.getAllPublications(); // Call the model function directly
    res.json(publications);
  } catch (error) {
    console.error('Error fetching publications :', error);
    res.status(500).json({ error: 'Failed to fetch publications' });
  }
};

exports.getPublicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const publication = await PublicationModel.getPublicationById(id);
    if (publication) {
      res.json(publication);
    } else {
      res.status(404).json({ error: 'Publication not found' });
    }
  } catch (error) {
    console.error('Error fetching publication by ID:', error);
    res.status(500).json({ error: 'Error fetching publication by ID' });
  }
};

exports.updatePublicationById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await PublicationModel.updatePublicationById(id, name);
    res.status(200).json({ message: 'Publication updated successfully' });
  } catch (error) {
    console.error('Error updating publication by ID:', error);
    res.status(500).json({ error: 'Error updating publication by ID' });
  }
};

exports.deletePublicationById = async (req, res) => {
  const publicationId = req.params.id;

  try {
    const result = await PublicationModel.deletePublicationById(publicationId);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred while deleting the publication.' });
  }
};