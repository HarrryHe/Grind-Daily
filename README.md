# GrindDaily - Proof of Concept

## Project Overview
GrindDaily is a daily challenge platform where users can view and complete tasks via the React frontend, while the Spring Boot backend provides RESTful APIs for data interaction.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Spring Boot 3.3.4
- **Database**: MongoDB or Firebase

## System Requirements
- **Operating System**: Windows 10, macOS, or Linux
- **Node.js**: v14 or higher
- **Java**: JDK 11 or higher
- **Maven**: 3.6+ version

## How to Run the Project

### Frontend (React)
1. Clone the frontend repository:
   git clone https://github.com/yourusername/grind-daily-frontend.git
   cd grind-daily-frontend

### Frontend (React)
1. Clone the frontend repository:
   git clone https://github.com/yourusername/grind-daily-frontend.git
   cd grind-daily-frontend
   
2. Install dependencies:
    npm install

3. Start the development server:
    npm start
    The React app will run on http://localhost:3000.

### Backend (Spring Boot)
1. Clone the backend repository:
    git clone https://github.com/yourusername/grind-daily-backend.git
    cd grind-daily-backend
    Run the Spring Boot application:
    ./mvnw spring-boot:run

The Spring Boot backend will run on http://localhost:8080.

### Connecting Frontend and Backend
The React frontend uses Axios to send requests to the Spring Boot backend's /api/tasks endpoint to fetch task data.