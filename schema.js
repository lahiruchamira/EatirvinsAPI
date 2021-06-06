const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID,
  } = require('graphql');
  const Note = require('./app/models/note.model.js');

  const books = [
    {
      id: 0,
      title: 'Mobey Dick',
      available: true
    },
    {
      id: 1,
      title: 'Harry Potter',
      available: true
    }
  ];
  const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: {
      _id: { type: GraphQLString },
      name: { type: GraphQLString },
      price: { type: GraphQLInt },
      description: {type: GraphQLString},
      image:{type: GraphQLString},
      tags:{type: new GraphQLList(GraphQLString)}
    }
    
  });
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Products: {
        type: new GraphQLList(ProductType),
        resolve(parentValue, args) {
          return Note.find();
        }
      },
      Product: {
        type: ProductType,
        args: {
          id: { type: GraphQLString}
        },
        resolve(parentValue, args) {
          return Note.findById(args.id);
        }
      }
    }
  });
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addProduct: {
        type: ProductType,
        args: {
            name: { type: GraphQLString },
            price: { type: GraphQLInt },
            description: {type: GraphQLString},
            image: {type: GraphQLString},
            tags: {type: new GraphQLList(GraphQLString)}
        },
        resolve(parentValue, args) {
          const product = {
            name: args.name,
            price: args.price,
            description: args.description,
            image: args.image
          }
          const note = new Note({
            name: args.name,
            price: args.price,
            description: args.description,
            image:args.description,
            tags:tags
        });
          Note.create(note);
        }
      }/* ,
      editBook: {
        type: BookType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
          title: { type: GraphQLString },
          available: { type: GraphQLBoolean }
        },
        resolve(parentValue, args) {
          const index = books.findIndex((b) => b.id === args.id);
  
          if (index > -1) {
            if (args.title) books[index].title = args.title;
            if (args.hasOwnProperty('available'))
              books[index].available = args.available;
            return books[index];
          }
        }
      },
      deleteBook: {
        type: BookType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve(parentValue, args) {
          const index = books.findIndex((b) => b.id === args.id);
          if (index > -1) {
            const el = books.splice(index, 1)[0];
            return el;
          }
        }
      } */
    }
  });
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
  });