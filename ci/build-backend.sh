#!/bin/sh
docker build -t tarsho-backend ./server
if [ $? -ne 0 ]; then
    echo "Backend Docker build failed"
    exit 1
fi
