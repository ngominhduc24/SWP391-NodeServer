# Use the official Node.js 18.12 image as a base image.
FROM node:18.12

# Set the working directory inside the container.
WORKDIR /app

# Copy the package.json and package-lock.json to the container.
COPY package*.json ./

# Install application dependencies.
RUN npm install

# Copy your application code to the container.
COPY . .

# Expose the port your application will run on.
EXPOSE 3000

# Define the command to start your Node.js application.
CMD ["npm", "start"]