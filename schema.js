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
          const product = new Note({
            name: args.name,
            price: args.price,
            description: args.description,
            image:args.description,
            tags:args.tags
        });
         return Note.create(product);
         
       
        }
      } ,
      editProduct: {
        type: ProductType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
          name: { type: GraphQLString },
            price: { type: GraphQLInt },
            description: {type: GraphQLString},
            image: {type: GraphQLString},
            tags: {type: new GraphQLList(GraphQLString)}
        },
        resolve(parentValue, args) {
          const updateProduct = Note.findById(args.id);
          const product = new Note({
            name: args.name,
            price: args.price,
            description: args.description,
            image:args.description,
            tags:args.tags
        })
          return Note.findByIdAndUpdate(args.id, { name: args.name , 
            price: args.price,
            description:args.description,
            image: args.description,
            tags:args.tags},{new: true});
        }
      },
      deleteProduct: {
        type: ProductType,
        args: {
          id:  {type : GraphQLString}
        },
        resolve(parentValue, args) {
          return Note.findByIdAndRemove(args.id);
        }
      }
    }
  });
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
  });