# Weather Backend API

A backend service for retrieving weather data by city. The application integrates with the OpenWeather API and uses Redis as a caching layer to improve performance. The system is fully containerized using Docker and Docker Compose.

---

## Features

- Fetch weather data by city
- Redis-based caching with automatic fallback if Redis is unavailable
- Centralized error handling
- Environment-based configuration
- Dockerized setup for easy deployment

---

## Tech Stack

- Node.js
- Express
- Axios
- Redis
- Docker
- Docker Compose

---

## Project Structure

```
.
├── src
│   ├── config
│   │   └── redis.js
│   ├── controllers
│   │   └── weatherController.js
│   ├── routes
│   │   └── weatherRoutes.js
├── .dockerignore
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── index.js
├── package.json
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=8000
HOST=0.0.0.0
WEATHER_API_KEY=your_api_key_here
```

---

## Running the Application with Docker

### Start the application

```
docker compose up
```

### Start with rebuild (use when code or dependencies change)

```
docker compose up --build
```

### Run in detached mode

```
docker compose up -d
```

### Stop the application

```
docker compose down
```

---

## Running Without Docker

Install dependencies:

```
npm install
```

Run the application:

```
npm start
```

---

## API Endpoints

### Get weather by city

```
GET /weather/:city
```

Example:

```
GET /weather/london
```

---

## Redis Behavior

- When Redis is available:
  - Responses are cached for 100 seconds
  - Repeated requests may be served from cache

- When Redis is unavailable:
  - The application continues to work without caching

---

## Error Handling

- Centralized error handling middleware
- Returns JSON responses with appropriate status codes and messages

---

## Notes

- The application connects to Redis using the Docker service name:

  ```
  redis://redis:6379
  ```

- `.env` is not committed to version control

---
