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
      provider: {
        type: UserType,
        resolve(parent, args) {
          console.log("Fetching provider for service:", parent.id);
          return User.findById(parent.providerId)
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
      description: { type: GraphQLString  },
      price: { type: new GraphQLNonNull(GraphQLInt) },
      availability: { type: GraphQLBoolean },
      requirements: { type: GraphQLString },
    };
  }
});

module.exports = ServiceType;
