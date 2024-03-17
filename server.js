const express =require('express');
const { ApolloServer ,gql} =require ('apollo-server-express');
const {mongoose} =require('mongoose');
const userSchema =require('./graphql/Schemas/userSchema.js')
const userresolvers =require('./graphql/Resolvers/userresolver.js')
const booksSchema = require('./graphql/Schemas/bookSchema.js')
const booksResolvers =require('./graphql/Resolvers/bookResolvers.js')
const authenticate =require('./graphql/authenticate.js')


const PORT =  7300;

// Create an instance of ApolloServer
async function startserver(){

  const app = express();

  const apolloserver = new ApolloServer({
    typeDefs: [userSchema, booksSchema],
    resolvers: [userresolvers, booksResolvers],
    context: authenticate,
  });
  
  // Start the Apollo Server
  await apolloserver.start()

apolloserver.applyMiddleware({app:app,path:"/server"});

app.get('/', (req, res) => {
      res.send('Api is running...');
   });


  await mongoose.connect('mongodb+srv://surendra:singh123@cluster0.ztxomvh.mongodb.net/IdeaClan2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(error => console.error('MongoDB connection error:', error));


app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
}

startserver();
