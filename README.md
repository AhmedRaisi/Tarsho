# Tarsho

## Overview

Tarsho is a cutting-edge mobile application designed to seamlessly connect independent contractors with customers seeking professional services. From HVAC and plumbing to electrical work, Tarsho simplifies the process of finding and engaging with reliable service providers. With its intuitive design and user-friendly interface, Tarsho is set to revolutionize the way customers and service professionals interact.

![Tarsho Banner](path/to/banner_image.png)

## Key Features

- **Dual Account Creation**: Users have the flexibility to sign up as either a consumer or a service provider, tailoring the experience to their specific role.
- **Service Listings**: Providers can showcase their range of services, including detailed information on pricing, location, and specialized skills.
- **Proximity Search**: Implementing advanced location-based search functionality, consumers can effortlessly find providers in their vicinity.
- **User-friendly Interface**: The application prides itself on its ease of navigation, allowing users to smoothly find and offer services.

## Tech Stack

This project is built using a diverse set of modern technologies to ensure a robust and scalable application:

- **Mobile**: Developed using React Native, providing a native app experience for both Android and iOS platforms.
- **Backend**: Crafted with Node.js and Express.js, ensuring a fast, reliable, and efficient server-side operation.
- **Database**: Utilizes MongoDB for flexible and scalable data storage.
- **Location Services**: Integrates Google Maps API for accurate geolocation functionalities.
- **Authentication**: Implements Firebase Authentication to ensure secure user access control.
- **Cloud**: Deployment and hosting strategy is currently being decided (TBD).
- **CI/CD**: Leverages GitHub Actions for automated integration and deployment pipelines.
- **Version Control**: Managed using Git, with GitHub serving as the central repository hub.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/)
- React & React Native CLI - Installation guide available [here](https://reactnative.dev/docs/environment-setup)
- MongoDB - [Download & Install MongoDB](https://www.mongodb.com/try/download/community)
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop)

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo/tarsho.git 

2. **Navigate to the project directory:**
   ```sh
   Copy code
   cd tarsho

#### Running the Project without Docker

1. **Install dependencies for the backend:**
   ```sh
   Copy code
   cd server
   npm install
2. **Install dependencies for the frontend:**
   ```sh
   Copy code
   cd ../web
   npm install
3. **Start the backend server:**
   ```sh
   Copy code
   npm start
4. **Run the frontend application:**
   ```sh
   Copy code
   npm start
#### Running the Project with Docker

1. **Build and start the Docker containers:**

   ```sh
   Copy code
   docker-compose up --build
This will set up both the backend and frontend environments inside Docker containers.

2. **Accessing the Application:**

The frontend should be accessible at http://localhost:3000.
The backend APIs should be accessible at http://localhost:4000.

### Development using Docker:

When using Docker, any code changes you make in your local environment will be reflected in the Docker containers, thanks to volume mappings in docker-compose.yml.

To view logs or debug, use docker logs [container_name] or access the shell of a container using 

   ```sh
   docker exec -it [container_name] sh.
   Stopping Docker Containers:

   ```sh
   Copy code
   docker-compose down

Contributing
We welcome contributions to Tarsho! Please read our Contributing Guide for details on our code of conduct and the process for submitting pull requests.
