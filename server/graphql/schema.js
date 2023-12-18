const {
  GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID,
  GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLUnionType,
  GraphQLInputObjectType, GraphQLFloat
} = require('graphql');

// Import Mongoose models
const User = require('../models/user');
const Service = require('../models/service');

// Import GraphQL custom types
const UserType = require('./types/userType');
const ServiceType = require('./types/serviceType');

// Utility modules for authentication
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Define the RootQuery for GraphQL.
 * This handles all the queries related to retrieving data.
 */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Define a query to get a user by ID
    user: {
      type: UserType, 
      args: { id: { type: GraphQLID } }, 
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    // Define a query to get a list of all users
    users: {
      type: new GraphQLList(UserType), 
      resolve(parent, args) {
        return User.find({});
      },
    },
    // Define a query to get a service by ID
    service: {
      type: ServiceType, 
      args: { id: { type: GraphQLID } }, 
      resolve(parent, args) {
        return Service.findById(args.id);
      },
    },
    // Define a query to get a list of all services
    services: {
      type: new GraphQLList(ServiceType), 
      resolve(parent, args) {
        return Service.find({}).populate('provider');
      },
    },
    // Define a query to get the users profile
    userProfile: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return User.findById(args.id).select('-password');
      },
    },
    // Define a query to get a list all the providers services
    providerServices: {
      type: new GraphQLList(ServiceType),
      args: { provider: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Service.find({ provider: args.provider });
      }
    },
    // Define a query to get a number of random users for services page
    randomUsers: {
      type: new GraphQLList(UserType),
      args: {
        limit: { type: GraphQLInt },
        skip: { type: GraphQLInt }
      },
      resolve(_, args) {
        return User.find({}).limit(args.limit).skip(args.skip);
      },
    },
    // Define a query to get random services for client home page
    randomServices: {
      type: new GraphQLList(ServiceType),
      args: {
        limit: { type: GraphQLInt },
        skip: { type: GraphQLInt }
      },
      resolve(_, args) {
        return Service.find({}).limit(args.limit).skip(args.skip);
      },
    },
    // Define a query to search for services or users 
    search: {
      type: new GraphQLList(new GraphQLUnionType({
        name: 'SearchResult',
        types: [UserType, ServiceType],
        resolveType(value) {
          if (value.username) {
            return UserType;
          }
          if (value.servicename) {
            return ServiceType;
          }
          return null;
        },
      })),
      args: {
        searchTerm: { type: GraphQLString }
      },
      async resolve(_, { searchTerm }) {
        const userResults = await User.find({ username: { $regex: searchTerm, $options: 'i' } });
        const serviceResults = await Service.find({ servicename: { $regex: searchTerm, $options: 'i' } });
        return [...userResults, ...serviceResults];
      },
    },

  },
});


/**
 * Define the LoginResponseType for the login mutation.
 */
const LoginResponseType = new GraphQLObjectType({
  name: 'LoginResponse',
  fields: () => ({
    token: { type: GraphQLString },
    userId: { type: GraphQLString },
    role: { type: GraphQLString },
    name: { type: GraphQLString } // Include any other user fields you want to return
  })
});


/**
 * Define the RegisterResponseType for the register mutation.
 */
const RegisterResponseType = new GraphQLObjectType({
  name: 'RegisterResponse',
  fields: () => ({
    token: { type: GraphQLString },
    userId: { type: GraphQLString },
    role: { type: GraphQLString },
    name: { type: GraphQLString },
    usertags: { type: new GraphQLList(GraphQLString) } // Add this line

  })
});


/**
 * Define the Mutation for GraphQL.
 * This handles all the mutations related to creating, updating, or deleting data.
 */
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Define a mutation to add a new user
    addUser: {
      type: UserType, 
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) }, 
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const user = new User({
          username: args.username,
          password: args.password,
          email: args.email,
          role: args.role,
        });
        try {
          const newUser = await user.save();
          return newUser;
        } catch (err) {
          throw new Error(err);
        }
      },
    },
    // Define a mutation to add a new service
    addService: {
      type: ServiceType, 
      args: {
        provider: { type: new GraphQLNonNull(GraphQLID) }, 
        servicename: { type: new GraphQLNonNull(GraphQLString) }, 
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const service = new Service({
          provider: args.provider,
          servicename: args.servicename,
          description: args.description,
          price: args.price,
        });
        try {
          const newService = await service.save();
          return newService;
        } catch (err) {
          throw new Error(err);
        }
      },
    },
    // Define a mutation to login
    login: {
      type: LoginResponseType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { username, password }) => {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error('Invalid Credentials');
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid Credentials');
        }
    
        const payload = {
          user: {
            id: user.id,
            role: user.role
          }
        };
    
        const token = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 3600 }
        );
    
        return {
          token,
          userId: user.id,
          role: user.role,
          name: user.name 
        };
      }
    },
    // Define a mutation to register
    register: {
      type: RegisterResponseType, 
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
        usertags: { type: new GraphQLList(GraphQLString) }, 

      },
      async resolve(_, args) {
        let user = await User.findOne({ username: args.username });
        if (user) {
          throw new Error('User already exists');
        }

        user = new User({
          username: args.username,
          password: args.password,
          email: args.email,
          role: args.role,
          usertags: args.usertags, 
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const payload = {
          user: {
            id: user.id
          }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

        return {
          token,
          userId: user.id,
          role: user.role,
          name: user.username 
        };
      }
    },
    // Define a mutation to update user profile information
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        contactNumber: { type: GraphQLString },
        address: { type: GraphQLString },
        profilePicture: { type: GraphQLString },
        description: { type: GraphQLString },
        usertags: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args) {
        const updateData = {
          name: args.name,
          email: args.email,
          contactNumber: args.contactNumber,
          address: args.address,
          profilePicture: args.profilePicture,
          description: args.description,
          usertags: args.usertags,
        };
    try {
      const updatedUser = await User.findByIdAndUpdate(args.id, updateData, { new: true });
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }

      },

      
    },

  },
});


// Export the GraphQL schema, including RootQuery and Mutation
module.exports = new GraphQLSchema({
  query: RootQuery, // RootQuery for queries
  mutation: Mutation, // Mutation for mutations
});





