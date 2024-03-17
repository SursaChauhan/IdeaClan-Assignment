// booksResolvers.js

const authenticate = require('../authenticate');
const Book = require('../models/book');
const bookRequest =require('../models/bookRequest')


const booksResolvers = {
  Query: {
    books: async () => {
      try {
        const books = await Book.find();
        return books;
      } catch (error) {
        throw new Error('Failed to fetch books');
      }
    },
    book: async (_, { id }) => {
      try {
        const book = await Book.findById(id);
        return book;
      } catch (error) {
        throw new Error('Failed to fetch book');
      }
    },
    searchBooks: async (_, { keyword }) => {
      console.log("keyword", keyword);
      try {
        const books = await Book.find({
          $or: [
            { title: { $regex: keyword, $options: 'i' } }, // Case-insensitive search by title
            { author: { $regex: keyword, $options: 'i' } } // Case-insensitive search by author
          ]
        });
        return books;
      } catch (error) {
        console.error(error.message);
        throw new Error('Failed to search books');
      }
    },
    
  },
  Mutation: {
    addBook: async (_, { title, author, description,ownerId },context) => {
      authenticate(context);

      if (context.user.role !== 'admin') {
        throw new Error('Only admin users can add books');
      }

      try {
        const newBook = new Book({
          title,
          author,
          description,
          owner: ownerId,
          available: true,
        });
        const savedBook = await newBook.save();
        return savedBook;
      } catch (error) {
        throw new Error('Failed to add book');
      }
    },
    deleteBook: async (_, { id },context) => {

      authenticate(context);

      if (context.user.role !== 'admin') {
        throw new Error('Only admin users can delete books');
      }

      try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
          throw new Error('Book not found');
        }
        return deletedBook;
      } catch (error) {
        throw new Error('Failed to delete book');
      }
    },
    updateBook: async (_, { id, title, author, description ,ownerId},context) => {

      authenticate(context);

      if (context.user.role !== 'admin') {
        throw new Error('Only admin have access to update');
      }
      try {
        const existingBook = await Book.findById(id);
        if (!existingBook) {
          throw new Error('Book not found');
        }
    
        // Update only the fields that are provided
        if (title) {
          existingBook.title = title;
        }
        if (author) {
          existingBook.author = author;
        }
        if (description) {
          existingBook.description = description;
        }
        if (ownerId) {
          existingBook.owner = ownerId;
        }
    
        // Save the updated book document
        const updatedBook = await existingBook.save();
        return updatedBook;
      } catch (error) {
        throw new Error('Failed to update book');
      }
    },
    borrowBook: async (_, { bookId, borrowerId }) => {
      try {
        const book = await Book.findById(bookId);
        if (!book) {
          throw new Error('Book not found');
        }
        if (!book.available) {
          throw new Error('Book is not available for borrowing');
        }
        // Update book ownership and availability
        book.owner = borrowerId;
        book.available = false;
        await book.save();
        return book;
      } catch (error) {
        throw new Error('Failed to borrow book');
      }
    },
    requestBorrowBook: async (_, { input }) => {
      
      try {
        const { bookId, requesterId } = input;
console.log(bookId,requesterId);

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
          throw new Error('Book not found');
        }

        // Create a new book request
        const newRequest = new bookRequest({
          bookId,
          requesterId,
          status: 'pending',
        });
        await newRequest.save();

        // Return a success message
        return {  message: 'Borrow request sent successfully' };
      } catch (error) {
        console.error('err',error.message);
        throw new Error('Failed to request to borrow book');
      }
    },
    approveBorrowRequest: async (_, { input }) => {
      try {
        const { requestId } = input;
        console.log(requestId);

        // Find the book request by ID
        const bookrequest = await bookRequest.findById(requestId);
        if (!bookrequest) {
          throw new Error('Book request not found');
        }

        // Check if the book request is pending
        if (bookrequest.status !== 'pending') {
          throw new Error('Book request has already been processed');
        }

        // Update the book ownership and availability
        const book = await Book.findById(bookrequest.bookId);
        if (!book) {
          throw new Error('Book not found');
        }

        // Transfer ownership to the requester
        book.owner = bookrequest.requesterId;
        book.available = false;
        await book.save();

        // Update the book request status to approved
        bookrequest.status = 'approved';
        await bookrequest.save();

        // Return a success message
        return { success: true, message: 'Borrow request approved successfully' };

      } catch (error) {
        console.error('err',error.message);
        throw new Error('Failed to approve borrowing request');
      }
    },
  },
};

module.exports = booksResolvers;
