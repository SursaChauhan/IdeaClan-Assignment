// bookRequest.js

const mongoose = require('mongoose');

const bookRequestSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Reference to the Book model
    required: true,
  },
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  // Add any other fields you need for book requests
}, { timestamps: true });

const BookRequest = mongoose.model('BookRequest', bookRequestSchema);

module.exports = BookRequest;
