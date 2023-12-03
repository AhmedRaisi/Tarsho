const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat
} = graphql;

// Import Mongoose model
const User = require('../models/user');
const Service = require('../models/service'); // Make sure this is correctly imported


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    // Deferred import to avoid circular dependency
    const ServiceType = require('./serviceType'); // Corrected import
    return {
      id: { type: GraphQLID },
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      realname: { type: GraphQLString },
      role: { type: new GraphQLNonNull(GraphQLString) },
      rating: { type: GraphQLFloat },
      contactNumber: { type: GraphQLString },
      address: { type: GraphQLString },
      profilePicture: { type: GraphQLString },
      services: {
        type: new GraphQLList(ServiceType),
        resolve(parent, args) {
          return Service.find({ providerId: parent.id });
        },
      },
      // reviews: {
      //   type: new GraphQLList(ReviewType),
      //   resolve(parent, args) {
      //     return Review.find({ userId: parent.id });
      //   },
      // },
    };
  }
});

module.exports = UserType;
