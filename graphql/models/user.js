const  mongoose =require ('mongoose');
// import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  }
);

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String,  default: 'Admin' },
  }
);


const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);


module.exports ={User,Admin};
