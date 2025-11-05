# Use the official Ubuntu as the base image
FROM ubuntu:20.04

# Set the working directory inside the container
WORKDIR /app

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Install other dependencies (e.g., bash and git if needed)
RUN apt-get install -y bash git

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the backend port (3000 in this case)
EXPOSE 3000

# Run the application
CMD ["node", "app.js"]
