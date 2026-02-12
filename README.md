# SortUrl - URL Shortener

A production-ready full-stack URL shortening service that converts long URLs into short, shareable links with robust analytics, user authentication, and secure link management.

## 🚀 Features

- **Shorten URLs**: Generate concise, unique short links instantly.
- **Analytics Dashboard**: Track clicks over time with visual charts.
- **User Authentication**: Secure registration and login (JWT-based).
- **Link Management**: View history, copy to clipboard, and delete links.
- **Responsive Design**: Modern, dark-themed UI built with Tailwind CSS.
- **Security**: HttpOnly cookies for refresh tokens, password hashing, and input validation.
- **Scalability**: Collision-proof URL generation algorithm.

---

## 🛠️ Tech Stack

### **Backend**
- **Language**: Java 21
- **Framework**: Spring Boot 3.4
- **Security**: Spring Security 6 (JWT, HttpOnly Cookies)
- **Database**: MySQL 8.0 (Spring Data JPA)
- **Build Tool**: Gradle 8.5

### **Frontend**
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4, Lucide React (Icons)
- **State Management**: React Context API
- **HTTP Client**: Axios (with interceptors)
- **Charts**: Recharts (for analytics visualization)
- **Notifications**: React Hot Toast

---

## 📂 Project Structure

```
SortUrl/
├── Backend/                 # Spring Boot Application
│   ├── src/main/java/       # Source code
│   │   ├── config/          # Security & App configurations
│   │   ├── controller/      # API Endpoints (Auth, Url, Redirect)
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # JPA Entities (User, UrlMapping, ClickEvent)
│   │   ├── exception/       # Global Exception Handling
│   │   ├── repository/      # Database Access Layer
│   │   ├── service/         # Business Logic
│   │   └── security/        # JWT & Auth Filters
│   └── src/main/resources/  # Config files (application.yaml)
│
├── Frontend/                # React Application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth Provider
│   │   ├── hooks/           # Custom hooks (e.g., useClipboard)
│   │   ├── pages/           # Dashboard, Login, Register, Landing
│   │   ├── services/        # API integration
│   │   └── styles/          # Global styles (Tailwind)
│   └── public/              # Static assets
│
└── README.md                # Project Documentation
```

---

## ⚙️ Setup Instructions

### Prerequisites
- **Java 21** or higher
- **Node.js 20** or higher
- **MySQL 8.0** running locally

### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd Backend
    ```

2.  **Configure Environment Variables:**
    Create a `.env` file in `Backend/` (or update `src/main/resources/application.yaml`):
    ```properties
    DB_URL=jdbc:mysql://localhost:3306/sorturl
    DB_USERNAME=root
    DB_PASSWORD=your_password
    JWT_SECRET=your_secure_random_secret_key_minimum_64_chars
    JWT_EXPIRATION=300000            # 5 minutes
    JWT_REFRESH_EXPIRATION=172800000 # 48 hours
    SERVER_PORT=8080
    ```

3.  **Create Database:**
    Open your MySQL client and run:
    ```sql
    CREATE DATABASE sorturl;
    ```

4.  **Run the Application:**
    ```bash
    ./gradlew bootRun
    ```
    The backend will start on `http://localhost:8080`.

### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd Frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in `Frontend/`:
    ```properties
    VITE_API_BASE_URL=http://localhost:8080/api/v1
    ```

4.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    The frontend will start on `http://localhost:5173`.

---

## 📡 API Documentation

All API endpoints are prefixed with `/api/v1`.

### **Authentication**

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login & receive `accessToken` + `refreshToken` cookie | ❌ |
| `POST` | `/auth/refresh-token` | Refresh access token using cookie | ❌ |

### **URL Management**

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/urls/shorten` | Create a short URL | ✅ |
| `GET` | `/urls/my-urls` | Get all URLs for current user | ✅ |
| `DELETE` | `/urls/{shortUrl}` | Delete a URL | ✅ |

### **Analytics**

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/urls/analytics/{shortUrl}` | Get analytics (clicks over time) | ✅ |
| `GET` | `/urls/total-clicks` | Get total clicks for user | ✅ |

### **Redirection**

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/{shortCode}` | Redirect to original URL (302) | ❌ |

---

## 🔐 Security Details

-   **JWT Access Tokens**: Short-lived (5 mins) tokens stored in memory/state.
-   **Refresh Tokens**: Long-lived (48 hours) tokens stored in **HttpOnly, Secure, SameSite=Strict** cookies. This prevents XSS attacks from stealing long-term access.
-   **Password Hashing**: BCrypt is used to hash passwords before storing them in the database.
-   **CORS**: Configured to allow requests only from specific frontend origins (`http://localhost:5173` in dev).

---

## 🧪 Testing

### Backend Tests
Run the JUnit test suite:
```bash
cd Backend
./gradlew test
```

### Frontend Build Verification
Verify the production build:
```bash
cd Frontend
npm run build
npm run preview
```

---

## ⚠️ Troubleshooting

-   **Backend won't start?**
    -   Check if MySQL is running.
    -   Verify credentials in `Backend/src/main/resources/application.yaml` or `.env`.
-   **Frontend API errors?**
    -   Ensure backend is running on port 8080.
    -   Check CORS configuration in `Backend/.../config/CorsConfig.java`.
-   **Login failing loops?**
    -   If running locally on `http`, ensure `cookie.setSecure(false)` is handled or `Secure` flag logic supports localhost (it does dynamically).

---

## 📄 License

This project is licensed under the **MIT License**.
