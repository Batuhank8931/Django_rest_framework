# Use the official Node.js image for frontend
FROM node:16

# Set the working directory for frontend
WORKDIR /app/frontend

# Copy the frontend code to the working directory
COPY . .

# Install frontend dependencies
RUN npm install

# Expose the port that React runs on
EXPOSE 3000

# Command to run the React development server
CMD ["npm", "start"]
