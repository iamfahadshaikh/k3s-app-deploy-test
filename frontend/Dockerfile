# Step 1: Use Ubuntu as the base image
FROM ubuntu:20.04

# Step 2: Set environment variables to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Step 3: Install Node.js, npm, and other necessary dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates \
    build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

# Step 4: Set the working directory in the container
WORKDIR /app

# Step 5: Copy your package.json into the container
COPY package.json /app/

# Step 6: Install npm dependencies from package.json
RUN npm install

# Step 7: Copy your frontend code into the container
COPY . /app

# Step 8: Expose the port (if you're running a web server)
EXPOSE 80

# Step 9: Use a simple HTTP server to serve your files (if you have static files)
RUN npm install -g http-server

# Step 10: Start the server (replace this if you're using a framework like React, Vue, etc.)
CMD ["http-server", "/app"]
