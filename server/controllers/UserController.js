const UserModel = require('../models/UserModel');

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userId = await UserModel.createUser(name, email, password, role);
    res.status(201).json({ id: userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.getAllUsers= async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};


exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ error: 'Error fetching user by email' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    await UserModel.updateUserById(id, name, email, password, role);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).json({ error: 'Error updating user by ID' });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.deleteUserById(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    res.status(500).json({ error: 'Error deleting user by ID' });
  }
};


exports.updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body; // Ensure this is correctly extracted

  console.log('Received body:', req.body); // Log the request body

  try {
    if (!id || is_active === undefined) {
      return res.status(400).json({ message: 'Missing required parameters.' });
    }

    const result = await UserModel.updateUserStatus(id, is_active);
    res.json({ message: 'User status updated successfully', result });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// In your controller file

exports.getUserHistory = async (req, res) => {
  const userId = req.params.userId; // Get the user ID from request params

  try {
    // Fetch issued books for the user using UserModel
    const issuedBooks = await UserModel.getIssuedBooksByUserId(userId);

    // Fetch book requests for the user using UserModel
    const bookRequests = await UserModel.getBookRequestsByUserId(userId);

    // Combine both results
    const history = {
      issuedBooks,
      bookRequests
    };

    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching user history:', error);
    res.status(500).json({ error: 'Error fetching user history' });
  }
};