// schema.js

const { gql } = require('apollo-server-express');

const userSchema = gql`
type User {
  _id: ID!
  username: String!
  email: String!
  role: String!
  }

  type Admin {
    _id: ID!
    name: String!
    email: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
    role: String!
  }

  input AdminInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    admins: [Admin!]!
    admin(id: ID!): Admin

  }

  type Mutation {
    createUser(userInput: RegisterInput!): User!
    createAdmin(adminInput: AdminInput!): Admin!
    login(userInput: LoginInput!): String!
    logout: String!
  }
 
`;

module.exports = userSchema;