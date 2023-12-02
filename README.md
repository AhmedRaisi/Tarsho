<div align="center">
 
# **Tarsho**

![GitHub stars](https://img.shields.io/github/stars/AhmedRaisi/tarsho?style=social)
![GitHub forks](https://img.shields.io/github/forks/AhmedRaisi/tarsho?style=social)
![GitHub issues](https://img.shields.io/github/issues/AhmedRaisi/tarsho)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AhmedRaisi/tarsho)
![GitHub last commit](https://img.shields.io/github/last-commit/AhmedRaisi/tarsho)
![GitHub contributors](https://img.shields.io/github/contributors/AhmedRaisi/tarsho)
[![codecov](https://codecov.io/gh/AhmedRaisi/Tarsho/graph/badge.svg?token=YQHS2IWY43)](https://codecov.io/gh/AhmedRaisi/Tarsho)

**"Empowering Your Independence, Enriching Your Choices – Tarsho is where entrepreneurs and clients connect to turn unique visions into vibrant realities."**

</div>
<br>

## Overview

Tarsho is a dynamic web and mobile application that fosters a thriving marketplace for entrepreneurs and small businesses to offer their diverse services. It's a platform where anyone, from independent contractors to budding entrepreneurs, can list their services, opening doors to new opportunities and clientele. For clients, Tarsho offers a chance to support local businesses and find unique services tailored to their needs. With its intuitive design and user-friendly interface, Tarsho is revolutionizing the way businesses and clients connect, turning unique visions into vibrant realities.



## Key Features

- Entrepreneurial Launchpad: Tarsho provides an ideal starting point for entrepreneurs and small businesses to showcase their services and grow their client base.

- Diverse Service Listings: From professional services like HVAC and electrical work to unique local offerings, Tarsho accommodates a wide range of entrepreneurial ventures.

- Projects and Packages: Service providers can create and offer custom packages or projects, grouping various services for enhanced client convenience.

- Local Business Support: A powerful tool for clients to discover and support small, local businesses, contributing to community growth.

- Proximity-Based Discovery: Advanced search functionality allows clients to easily find and connect with nearby service providers.

- Seamless User Experience: The platform is designed for effortless navigation, ensuring smooth interactions between businesses and clients.

## Tech Stack

Tarsho employs a range of modern technologies:

- Mobile: Built with React Native for a seamless Android and iOS app experience.
- Web: Developed using React, ensuring a dynamic and responsive web platform.
- Backend: Engineered with Node.js and Express.js for robust server-side performance.
- Database: Uses MongoDB for scalable and flexible data management.
- Location Services: Integrated with Google Maps API for precise geolocation features.
- Authentication: Secured with Firebase Authentication.
- Cloud & Hosting: Deployment strategy TBD.
- CI/CD: Utilizes GitHub Actions for continuous integration and deployment.
- Version Control: Managed with Git, hosted on GitHub.

## Getting Started

### Prerequisites

- js -[Download & Install](https://nodejs.org/en/download/)
- Docker -[Download & Install](https://www.docker.com/products/docker-desktop)

### Installation

#### Running the Project with Docker:

This method sets up the backend, frontend, and database together.

- Clone the repository:
```git clone https://github.com/AhmedRaisi/tarsho.git```


- Start Docker containers:
```docker-compose up --build```

Access the project at [http://localhost:4000](http://localhost:4000/).

#### Development without Docker 

For frontend React development:

- Navigate to the web directory and install dependencies:
```cd web```
```npm install```

- Run the React application:
```npm start```


#### Backend and Database Setup

- Navigate to the server directory and install dependencies:
```cd server```
```npm install```

- Start the backend server:
```npm start```


#### Docker Commands

- View logs:
```docker logs [container\_name]```


- Access container shell:
```docker exec -it [container\_name] sh```


- Stop containers:
 ```docker-compose down```


## Contributing

Contributions are welcome! Please read our[Contributing Guide](https://chat.openai.com/c/LINK_TO_CONTRIBUTING_GUIDE) for details on the code of conduct and the process for submitting pull requests.


## License

This project is licensed under the MIT License - see the[LICENSE](https://chat.openai.com/c/LINK_TO_LICENSE) file for details.
