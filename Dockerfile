# Use an official Node.js runtime as the parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install server dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port the server will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
