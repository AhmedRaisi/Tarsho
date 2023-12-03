const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const User = require('../models/user'); // Import the User Mongoose model
const Service = require('../models/service'); // Import the Service Mongoose model
const UserType = require('./userType'); // Import UserType for user-related operations
const ServiceType = require('./serviceType'); // Import ServiceType for service-related operations
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the RootQuery, which handles GraphQL queries (retrieving data)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Define a query to get a user by ID
    user: {
      type: UserType, // Specify the return type (UserType)
      args: { id: { type: GraphQLID } }, // Define an argument 'id' of type GraphQLID
      resolve(parent, args) {
        // Resolve function to fetch a user by ID using Mongoose
        return User.findById(args.id);
      },
    },
    // Define a query to get a list of all users
    users: {
      type: new GraphQLList(UserType), // Specify the return type (list of UserType)
      resolve(parent, args) {
        // Resolve function to fetch all users using Mongoose
        return User.find({});
      },
    },
    // Define a query to get a service by ID
    service: {
      type: ServiceType, // Specify the return type (ServiceType)
      args: { id: { type: GraphQLID } }, // Define an argument 'id' of type GraphQLID
      resolve(parent, args) {
        // Resolve function to fetch a service by ID using Mongoose
        return Service.findById(args.id);
      },
    },
    // Define a query to get a list of all services
    services: {
      type: new GraphQLList(ServiceType), // Specify the return type (list of ServiceType)
      resolve(parent, args) {
        // Resolve function to fetch all services using Mongoose
        return Service.find({});
      },
    },
  },
});


// Define a new type for the login response
const LoginResponseType = new GraphQLObjectType({
  name: 'LoginResponse',
  fields: () => ({
    token: { type: GraphQLString },
    userId: { type: GraphQLString },
    role: { type: GraphQLString },
    name: { type: GraphQLString } // Include any other user fields you want to return
  })
});


// Define a new type for the registration response
const RegisterResponseType = new GraphQLObjectType({
  name: 'RegisterResponse',
  fields: () => ({
    token: { type: GraphQLString },
    userId: { type: GraphQLString },
    role: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});


// Define the Mutation, which handles GraphQL mutations (creating, updating, or deleting data)
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Define a mutation to add a new user
    addUser: {
      type: UserType, // Specify the return type (UserType)
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) }, // Define input arguments with validation
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        // Resolve function to create and save a new user using Mongoose
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
      type: ServiceType, // Specify the return type (ServiceType)
      args: {
        providerId: { type: new GraphQLNonNull(GraphQLID) }, // Define input arguments with validation
        providername: { type: new GraphQLNonNull(GraphQLString) }, // Updated field name
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        // Resolve function to create and save a new service using Mongoose
        const service = new Service({
          providerId: args.providerId,
          providername: args.providername, // Updated field name
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
          name: user.name // assuming name is a field on the user model
        };
      }
    },
    register: {
      type: RegisterResponseType, // Assuming UserType has the fields you want to return
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) }
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
          role: args.role
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
          name: user.username // Adjust based on your User model
        };
      }
    },

  },
});



// Export the GraphQL schema, including RootQuery and Mutation
module.exports = new GraphQLSchema({
  query: RootQuery, // RootQuery for queries
  mutation: Mutation, // Mutation for mutations
});



