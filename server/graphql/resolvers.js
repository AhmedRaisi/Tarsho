const User = require('../models/user');
const Service = require('../models/service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    // Resolver to get a user by ID
    user: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new Error(error);
      }
    },
    // Resolver to get a list of all users
    users: async () => {
      try {
        return await User.find({});
      } catch (error) {
        throw new Error(error);
      }
    },
    // Resolver to get a service by ID
    service: async (_, { id }) => {
      try {
        return await Service.findById(id);
      } catch (error) {
        throw new Error(error);
      }
    },
    // Resolver to get a list of all services
    services: async () => {
      try {
        return await Service.find({});
      } catch (error) {
        throw new Error(error);
      }
    },
    userProfile: async (_, { id }) => {
      try {
        return await User.findById(id).select('-password');
      } catch (error) {
        throw new Error('Server error');
      }
    },
  },
  Mutation: {
    // Resolver to add a new user
    addUser: async (_, { username, password, email, role }) => {
      const user = new User({ username, password, email, role });
      try {
        return await user.save();
      } catch (error) {
        throw new Error(error);
      }
    },
    // Resolver to add a new service
    addService: async (_, { provider, description, price }) => {
      const service = new Service({ provider, description, price });
      try {
        return await service.save();
      } catch (error) {
        throw new Error(error);
      }
    },
    login: async (_, { username, password }) => {
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
        name: user.name // Adjust according to your User model
      };
    },
    register: async (_, { username, password, email, role }) => {
      let user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }

      user = new User({
        username,
        password, // Will be hashed before saving
        email,
        role
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
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
        // include any other fields you want to return
      };
    },
    updateUser: async (_, { id, name, email, contactNumber, address, profilePicture }) => {
      try {
        // Find the user and update their details
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { name, email, contactNumber, address, profilePicture },
          { new: true } // This option returns the updated document
        );

        if (!updatedUser) {
          throw new Error('User not found');
        }

        // Return the updated user data, excluding sensitive fields like password
        return {
          ...updatedUser.toObject(),
          password: null,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

  },
};

module.exports = resolvers;


