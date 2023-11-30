# Contributing to Tarsho

Welcome to the Tarsho project! We're excited to have you on board and look forward to your contributions. This guide will help you set up your development environment and understand our contribution process.

## Quick Navigation

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Development Tips](#development-tips)
- [Contributing Changes](#contributing-changes)
- [Need Help?](#need-help)

## Prerequisites

Before you start, please ensure you have the following installed:

- Git: Essential for version control.
- js and npm: Required for managing project dependencies.
- Docker Desktop: Needed for managing containerized services.

### For Windows

- Download[Git for Windows](https://git-scm.com/download/win).
- Get Node.js (includes npm) from the[Node.js website](https://nodejs.org/en/).
- Install Docker Desktop from[Docker Hub](https://www.docker.com/products/docker-desktop). Ensure WSL 2 is configured for Docker.

### For macOS

- Git is generally pre-installed on macOS. If not, install via[Homebrew](https://brew.sh/)
```brew install git```

- Install Node.js and npm through Homebrew:
```brew install node```

- Download Docker Desktop from[Docker Hub](https://www.docker.com/products/docker-desktop).

## Setup

- Clone the Repository:

```git clone https://github.com/AhmedRaisi/Tarsho```

```cd Tarsho```

Frontend Setup:

- Navigate to the web directory and install dependencies:

```cd web```

```npm install```


Backend Setup:

- Set up the backend in the server directory:

```cd ../server```

```npm install```

-

Running Docker Compose:

- Start Docker Desktop and then run:

```cd ..```

```docker-compose up -d```

Accessing the Application:

- The app should be accessible at http://localhost:3000 for the frontend and http://localhost:4000 for the backend.

## Development Tips

- Use Visual Studio Code for a consistent development experience.
- Follow coding standards using ESLint and Prettier, which can be integrated into VS Code.
- Regularly update your local repository to stay in sync with the main project.

## Contributing Changes

- Adhere to the project's coding conventions and guidelines.
- Thoroughly test your changes locally before submitting.
- Submit pull requests with clear descriptions of the changes and their purpose.

## Need Help?

If you encounter any issues or have questions, feel free to open an issue on the[GitHub repository](https://github.com/AhmedRaisi/Tarsho).