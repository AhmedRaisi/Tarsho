
#!/bin/sh
docker-compose -f docker-compose.test.yml up -d
# Wait for services to be fully up and running
# e.g., using sleep or a more sophisticated health check script
sleep 30
# Here you can execute your integration tests, for example:
# Run tests inside the backend container
docker exec tarsho-backend-1 npm run test-integration
test_exit_code=$?
# Shut down the services
docker-compose -f docker-compose.test.yml down
# Exit with the test exit code
exit $test_exit_code
