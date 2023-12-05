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
    const UserType = require('./userType'); // Deferred import
    return {
      id: { type: GraphQLID },
      provider: {
        type: UserType,
        resolve(parent, args) {
          // Correctly reference the 'provider' field
          return User.findById(parent.provider)
            .then(user => {
              console.log("Found user:", user);
              return user;
            })
            .catch(err => {
              console.error("Error fetching user:", err);
              throw err;
            });
        },
      },
      servicename: { type: GraphQLString },
      description: { type: GraphQLString },
      price: { type: new GraphQLNonNull(GraphQLInt) },
      availability: { type: GraphQLBoolean },
      requirements: { type: GraphQLString },
    };
  }
});

module.exports = ServiceType;

