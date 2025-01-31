# Use the official Node.js image as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the Remix app
CMD ["npm", "run", "dev"]