#!/bin/sh
docker build -t tarsho-frontend ./web
if [ $? -ne 0 ]; then
    echo "Frontend Docker build failed"
    exit 1
fi
