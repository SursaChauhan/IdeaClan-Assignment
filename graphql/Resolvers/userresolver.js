// resolvers.js

const { User, Admin } =require ('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userresolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error('Failed to fetch user');
      }
    },
    admins: async () => {
      try {
        const admins = await Admin.find();
        return admins;
      } catch (error) {
        throw new Error('Failed to fetch admins');
      }
    },
    admin: async (_, { id }) => {
      try {
        const admin = await Admin.findById(id);
        return admin;
      } catch (error) {
        throw new Error('Failed to fetch admin');
      }
    },
 
      
  },
  Mutation: {
    createUser: async (parent, { userInput }) => {
      const { username, email, password } = userInput;
      try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          role: 'user', // Default role for registered users
        });
        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        console.error('Error registering user:', error.message);
        throw new Error('Failed to register user. Please try again later.');
      }
    },
    createAdmin: async (parent, { adminInput }) => {
      const { name, email, password } = adminInput;
      try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
          name,
          email,
          password:hashedPassword,
          role: 'Admin',
        });
        const result = await newAdmin.save();
        return result;

      } catch (error) {
        throw new Error('Failed to create admin');
      }
    },
    login: async (parent, {userInput}) => {
      const {  email, password ,role} = userInput;
      console.log(email,password,role);
      try {
        if (role === 'user') {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error('User not found');
          }
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            throw new Error('Invalid password');
          }
          // Generate JWT token
          const token = jwt.sign({ userId: user._id }, "sursa", { expiresIn: '1h' });
          return token;
        } else if (role === 'Admin') {
          const admin = await Admin.findOne({ email });
          if (!admin) {
            throw new Error('Admin not found');
          }
          const validPassword = await bcrypt.compare(password, admin.password);
          if (!validPassword) {
            throw new Error('Invalid password');
          }
          // Generate JWT token
          const token = jwt.sign({ adminId: admin._id }, "sursa", { expiresIn: '1h' });
          return token;
        } else {
          throw new Error('Invalid role');
        }
      } catch (error) {
        console.error('Login error:', error.message);
        throw new Error('Failed to login. Please check your credentials.');
      }
    },
    
    logout: async (_, __, context) => {
      try {
        // Simply return success message for now
        return 'Logged out successfully';
      } catch (error) {
        throw new Error('Failed to logout');
      }
    },
    
  },
};

module.exports = userresolvers;