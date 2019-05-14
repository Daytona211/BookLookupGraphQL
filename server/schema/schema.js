const graphql = require("graphql");
const db = require('../app.js')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        for (var i = 0; i < authors.length; i++)
          if (authors[i].id == parent.authorId) {
            return authors[i];
          }
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        var resBooks = [];
        for (var i = 0; i < books.length; i++) {
          if (books[i].authorId == parent.id) {
            resBooks.push(books[i]);
          }
        }
        return resBooks;
      }
    }
  })
});

//dummy data
const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
  { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
  { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" }
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Practhett", age: 66, id: "3" }
];

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from DB / other source
        for (var i = 0; i < books.length; i++)
          if (books[i].id == args.id) {
            return books[i];
          }
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db or other source
        for (var i = 0; i < authors.length; i++)
          if (authors[i].id == args.id) {
            return authors[i];
          }
      }
    },
    books:{
        type: GraphQLList(BookType),
        resolve(parent, args){
            return db;
        }
    },
    authors:{
        type: GraphQLList(AuthorType),
        resolve(parent, args){
            return authors;
        }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
