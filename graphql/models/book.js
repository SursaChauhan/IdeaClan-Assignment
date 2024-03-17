// Book.js

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who owns the book
  available: { type: Boolean, default: true },
});

bookSchema.index({ title: 'text', author: 'text' });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
