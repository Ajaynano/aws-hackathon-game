# Docker Setup for Angular Application

## Prerequisites
- Docker installed on your system
- Docker Compose (optional, for easier management)

## Building and Running the Container

### Option 1: Using Docker directly
```bash
# Build the Docker image
docker build -t hello-world-app .

# Run the container
docker run -p 4200:80 hello-world-app
```

### Option 2: Using Docker Compose
```bash
# Build and run with docker-compose
docker-compose up --build

# Run in detached mode
docker-compose up -d --build
```

## Accessing the Application
Once the container is running, access your Angular application at:
- http://localhost:4200

## Container Details
- **Base Image**: nginx:alpine (production-ready web server)
- **Build Process**: Multi-stage build using Node.js 18 Alpine
- **Port**: Container exposes port 80, mapped to host port 4200
- **Features**: 
  - Optimized production build
  - Angular routing support
  - Static asset caching
  - Lightweight Alpine Linux base

## Stopping the Container
```bash
# If using docker-compose
docker-compose down

# If using docker run
docker stop <container-id>
```

## Environment Variables
If your application requires environment variables, modify the Dockerfile to include them or use docker-compose environment section.