#!/bin/sh

# Check for any prerequisites or perform pre-build steps
# For example, checking if Docker is running
# docker info > /dev/null 2>&1
# if [ $? -ne 0 ]; then
#     echo "Docker is not running. Please start Docker."
#     exit 1
# fi

# Building the Docker Compose setup
echo "Building the Docker Compose environment..."
docker-compose -f docker-compose.yml build

if [ $? -ne 0 ]; then
    echo "Docker Compose build failed"
    exit 1
fi

echo "Build completed successfully."
