# Use the official Node.js 14 image as a base image
FROM node:18.17.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app in development mode
CMD ["npm", "start"]
