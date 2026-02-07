# SortUrl - URL Shortener

A full-stack URL shortening service that converts long URLs into short, shareable links with click analytics and expiration support.

## Features

- Generate short URLs from long URLs
- Redirect short URLs to original destinations
- Track click analytics per URL
- URL expiration support
- User authentication (register/login)
- Copy short URL to clipboard
- View click statistics and history
- Responsive web interface

## Tech Stack

**Frontend:**
- React 19
- Vite
- JavaScript
- CSS

**Backend:**
- Java 21
- Spring Boot
- Spring Security with JWT
- Spring Data JPA

**Database:**
- MySQL

**Tools:**
- Gradle
- npm

## Architecture

### Backend Architecture

The backend follows a layered architecture pattern:

- **Controller Layer** - Handles HTTP requests and responses
- **Service Layer** - Contains business logic
- **Repository Layer** - Manages database operations
- **Security Layer** - JWT-based authentication and authorization

### Frontend Structure

The frontend is a React application built with Vite:

- **Components** - Reusable UI components
- **Assets** - Static files and images
- **Styles** - CSS stylesheets

### Request Flow

```
User -> React Frontend -> REST API -> Service Layer -> Repository -> MySQL Database
                                                    <- Response <-
```

1. User interacts with the React frontend
2. Frontend sends HTTP requests to the Spring Boot API
3. Controller routes the request to the appropriate service
4. Service executes business logic and interacts with the repository
5. Repository performs database operations
6. Response flows back through the layers to the user

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### URL Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/urls` | Create a new short URL |
| GET | `/api/urls` | Get all URLs for authenticated user |
| GET | `/api/urls/{id}` | Get URL details by ID |
| DELETE | `/api/urls/{id}` | Delete a URL mapping |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/urls/{id}/clicks` | Get click analytics for a URL |

### Redirect

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/{shortCode}` | Redirect to original URL |

## Screenshots

![Home Page](./screenshots/home.png)

![URL Shortener Form](./screenshots/shortener.png)

![Analytics Dashboard](./screenshots/analytics.png)

## Folder Structure

```
SortUrl/
├── Backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/backend/
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── RedirectController.java
│   │   │   │   │   └── UrlMappingController.java
│   │   │   │   ├── dto/
│   │   │   │   │   ├── request/
│   │   │   │   │   └── response/
│   │   │   │   ├── entity/
│   │   │   │   │   ├── ClickEvent.java
│   │   │   │   │   ├── UrlMapping.java
│   │   │   │   │   └── User.java
│   │   │   │   ├── exception/
│   │   │   │   ├── mapper/
│   │   │   │   ├── repository/
│   │   │   │   ├── security/
│   │   │   │   │   ├── jwt/
│   │   │   │   │   └── service/
│   │   │   │   └── service/
│   │   │   │       └── impl/
│   │   │   └── resources/
│   │   │       └── application.yaml
│   │   └── test/
│   ├── build.gradle
│   └── settings.gradle
│
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Setup Instructions

### Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Gradle

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Configure the database connection in `src/main/resources/application.yaml`

3. Create the MySQL database:
   ```sql
   CREATE DATABASE sorturl;
   ```

4. Build the project:
   ```bash
   ./gradlew build
   ```

5. Run the application:
   ```bash
   ./gradlew bootRun
   ```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## Environment Variables

### Backend Configuration

Configure the following in `src/main/resources/application.yaml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/sorturl
    username: your_username
    password: your_password
  jpa:
    hibernate:
      ddl-auto: update

jwt:
  secret: your_jwt_secret_key
  expiration: 86400000

server:
  port: 8080
```

### Frontend Configuration

Create a `.env` file in the Frontend directory:

```
VITE_API_BASE_URL=http://localhost:8080
```

## How It Works

1. **User enters a long URL**
   - The user submits a long URL through the frontend form

2. **Backend generates a short code**
   - The service generates a unique hash/code for the URL
   - A Base62 encoding or similar algorithm creates a short alphanumeric code

3. **URL mapping is stored in the database**
   - The original URL, short code, user ID, and expiration date are saved
   - The UrlMapping entity maintains the relationship

4. **Redirect logic**
   - When a user visits the short URL, the RedirectController handles the request
   - It looks up the original URL by short code
   - If valid and not expired, it redirects to the original URL
   - A click event is recorded for analytics

5. **Analytics tracking**
   - Each redirect creates a ClickEvent record
   - Click count, timestamps, and other metrics are stored
   - Users can view analytics through the dashboard

## Future Improvements

- Custom URL aliases
- Rate limiting for API endpoints
- Redis caching for frequently accessed URLs
- QR code generation for short URLs
- Bulk URL shortening
- URL password protection
- Geographic analytics
- API key authentication for third-party access
- URL preview before redirect
- Admin dashboard

## Contributing

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request

## License

MIT License
