# Use the official Node.js image as the base image
FROM node:22

RUN useradd -ms /bin/sh -u 1001 app

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copy source files into application directory
COPY --chown=app:app . /app

# Start the Remix app
CMD ["npm", "run", "dev"]