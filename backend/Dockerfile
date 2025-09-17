# Stage 1: Get the Dart SDK from the official Dart image
FROM dart:stable AS dart_sdk

# Stage 2: Build the final image on top of the official Node.js image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the Dart SDK from the first stage into our Node.js image
COPY --from=dart_sdk /usr/lib/dart /usr/lib/dart

# Add the Dart SDK to the system's PATH so the 'dart' command can be found
ENV PATH="/usr/lib/dart/bin:${PATH}"

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of your backend application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# The command to start your application
CMD ["node", "app.js"]