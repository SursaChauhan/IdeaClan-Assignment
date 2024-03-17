// booksSchema.js

const { gql } = require('apollo-server-express');

const booksSchema = gql`
  type Book {
    _id: ID!
    title: String!
    author: String!
    description: String!
    owner: User!
    available: Boolean!
  }
  input RequestBorrowBookInput {
    bookId: ID!
    requesterId: ID!
  }
  
  input ApproveBorrowRequestInput {
    requestId: ID!
  }

  extend type Query {
    books: [Book!]!
    book(id: ID!): Book
    searchBooks(keyword: String!): [Book!]!
  }

  extend type Mutation {
    addBook(title: String!, author: String!, description: String!): Book!
    deleteBook(id: ID!): Book
    updateBook(id: ID!, title: String!, author: String!, description: String!): Book
    borrowBook(bookId: ID!, borrowerId: ID!): Book!
    requestBorrowBook(input: RequestBorrowBookInput!): Boolean
    approveBorrowRequest(input: ApproveBorrowRequestInput!): Boolean
  }
`;

module.exports = booksSchema;
