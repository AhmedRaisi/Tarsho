# Use the official Node.js 14 image as a base image
FROM node:18.17.0

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the rest of the codebase into the container
COPY . .

# Expose port 4000 for the application
EXPOSE 4000

# Command to run when the container starts
CMD ["npm", "run", "dev"]
