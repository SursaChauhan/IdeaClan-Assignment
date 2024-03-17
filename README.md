## IdeaClan-Assignment
# Project Overview
This project is a GraphQL-based library management system. It allows users to browse and search for books, borrow or buy books, and request to borrow books from other users. The system supports authentication with user and admin roles.

Stack
Backend: Node.js, Express.js, GraphQL, MongoDB (with Mongoose)
Frontend: (Not specified)
# Setup Instructions
Clone the repository to your local machine:

1. git clone <repository_url>
Install dependencies:

2. cd IdeaClan-Assignment
   npm install

3. Run the server 
 npm start OR npm run dev
The GraphQL server will be running on http://localhost:7100/graphql.

## API Documentation
 # Queries
Fetch all books

1. query {
  books {
    _id
    title
    author
    description
  }
}

2.Fetch a book by ID
query {
  book(id: "<book_id>") {
    _id
    title
    author
    description
  }
}
3. Search books by title or author
query {
  searchBooks(keyword: "<search_keyword>") {
    _id
    title
    author
    description
  }
}

# Mutations
1. Add a new book
mutation {
  addBook(title: "<book_title>", author: "<book_author>", description: "<book_description>") {
    _id
    title
    author
    description
  }
}
2. Delete a book by ID
mutation {
  deleteBook(id: "<book_id>") {
    _id
    title
    author
    description
  }
}
3. Update a book by ID
mutation {
  updateBook(id: "<book_id>", title: "<new_title>", author: "<new_author>", description: "<new_description>") {
    _id
    title
    author
    description
  }
}
4. Borrow a book
mutation {
  borrowBook(bookId: "<book_id>", borrowerId: "<borrower_id>") {
    _id
    title
    author
    description
    owner
    available
  }
}
5. Request to borrow a book
mutation {
  requestBorrowBook(input: { bookId: "<book_id>", requesterId: "<requester_id>" }) {
    message
  }
}

6. Approve a borrowing request
mutation {
  approveBorrowRequest(input: { requestId: "<request_id>" }) {
    success
    message
  }
}

## Authentication Procedures
 # User Authentication:

* Users can register by providing a username, email, and password.
* Users can log in using their email and password.
* Upon successful login, a JWT token is generated and returned, which should be included in the Authorization header for subsequent requests.

# Admin Authentication:
* Admins can register by providing a name, email, and password.
* Admins can log in using their email and password.
* Upon successful login, a JWT token is generated and returned, which should be included in the Authorization header for subsequent requests.
# Admin Login 


## Workflow
User Registration:

# Users can register with their username, email, and password.
User Login:

# Users can log in with their registered email and password.
Upon successful login, a JWT token is generated and returned.


# Admins can log in with their registered email and password.
Upon successful login, a JWT token is generated and returned.

## Book Management:

# Admins can perform CRUD operations (Create, Read, Update, Delete) on books.
# Users can search for books by title or author.
# Users can request to borrow books from other users.
# User can approve or reject borrowing requests from another users.

## Authentication:

# All requests to protected routes should include a valid JWT token in the Authorization header.

* Additional Notes
1. Authentication Middleware: Middleware is implemented to authenticate and authorize users based on their roles (user or admin) before performing CRUD operations on books.

2. Authorization: Only admins can perform CRUD operations on books, while users can only request to borrow books.

2. Error Handling: Proper error handling is implemented for various scenarios, including failed requests and unauthorized access.

# Thanks For Visiting ,Follow For more such Content #
## Surendra Singh ## 
