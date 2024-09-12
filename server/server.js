const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend URL
  credentials: true,
}));

 const userRoutes = require('./routes/UserRoutes');
const bookRoutes = require('./routes/BookRoutes');
const authorRoutes = require('./routes/AuthorRoutes');
const genreRoutes = require('./routes/GenreRoutes');
const publicationRoutes = require('./routes/PublicationRoutes');
const authRoutes = require('./routes/AuthRoutes');
const searchRoutes=require('./routes/searchRoutes');
const bookRequestRoutes = require('./routes/BookRequestRoutes')
const issuedBookRequests=require('./routes/IssuedBooksRoutes')
const metricRoutes=require('./routes/MetricRoutes')

// Middleware
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
 app.use('/api', authorRoutes);
 app.use('/api', genreRoutes);
 app.use('/api', publicationRoutes);
app.use('/api',searchRoutes);
app.use('/api',userRoutes);
app.use('/api/request',bookRequestRoutes);
app.use('/api/issued-books',issuedBookRequests);
app.use('/api',metricRoutes);
// Error handling
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
