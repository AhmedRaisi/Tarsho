const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull
} = graphql;

// Import Mongoose model
const User = require('../models/user');


const ServiceType = new GraphQLObjectType({
  name: 'Service',
  fields: () => {
    // Deferred import to avoid circular dependency
    const UserType = require('./userType');
    return {
      id: { type: GraphQLID },
      providerId: { type: GraphQLID },
      providername: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      price: { type: new GraphQLNonNull(GraphQLInt) },
      availability: { type: GraphQLBoolean },
      requirements: { type: GraphQLString },
      provider: {
        type: UserType,
        resolve(parent, args) {
          return User.findById(parent.providerId);
        },
      },
    };
  }
});

module.exports = ServiceType;
