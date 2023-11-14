FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]


# This Dockerfile:

# Starts from a base Node.js image.
# Sets a working directory inside the container.
# Copies package.json and package-lock.json and installs dependencies.
# Copies the rest of your backend code into the container.
# Exposes port 4000.
# Specifies the command to start the server.