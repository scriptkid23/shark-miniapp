# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./

RUN npm install --force

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build


# Start the application in production mode
CMD ["npm", "run", "serve"]
