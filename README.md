# WBSCPR
# Reviews Scraper 

## Overview

Welcome to the **WBSCPR:Reviews Scraper**! This project utilizes **ScrapeGraph.ai**, **Node.js**, and **Render** to build a robust review scraping application that fetches product reviews from various e-commerce websites and displays them on a user-friendly interface. The application is designed to help businesses, researchers, or developers access aggregated reviews for analysis, insights, or feedback purposes.

The app leverages **ScrapeGraph.ai** for scraping data, **Node.js** for backend development, and **Render** for cloud deployment, offering a seamless experience with scalability, reliability, and ease of access.

---

## Features

### 1. **Dynamic Review Scraping**
   - Scrape product reviews from popular e-commerce websites in real-time.
   - Data is automatically aggregated and structured for easy consumption.

### 2. **Backend Powered by Node.js and Express**
   - Fast and lightweight API built using **Node.js**.
   - Simple and intuitive routes for scraping and serving data.
   - Serve dynamic content with minimal latency.

### 3. **Cloud Hosting on Render**
   - Hosted on **Render** for fast deployment and high availability.
   - Automatic scaling based on demand to ensure the app performs smoothly.

### 4. **API for Easy Integration**
   - Built-in API to fetch reviews, making it easy to integrate with other applications or tools.
   - Data can be used in analysis, reporting, or visualizations.

### 5. **Extensible and Scalable**
   - Easily extendable architecture to add more scraping sources, endpoints, or functionalities.
   - Can be scaled as needed without major refactors.

---

## Technologies Used

- **ScrapeGraph.ai**: Tool for web scraping that fetches product reviews data from e-commerce websites.
- **Node.js**: JavaScript runtime environment used to build the server and manage APIs.
- **Express**: A fast, unopinionated framework for building web applications with Node.js.
- **Render**: Cloud service platform for hosting web apps, ensuring ease of deployment and scaling.
- **dotenv**: Manage environment variables for API keys and configurations securely.

---

## System Architecture

The system follows a simple yet effective architecture:

- **Frontend (Client)**: The user interacts with the frontend, which could be a simple web page or API.
- **Backend (Node.js)**: The Node.js server listens for API requests, initiates scraping via ScrapeGraph.ai, and processes the data before sending it to the frontend or external applications.
- **ScrapeGraph.ai**: This service fetches data (reviews) from e-commerce websites and returns it to the backend.
- **Render**: Hosts the backend application and ensures it is live and accessible to users.

![System Architecture](assets/system-architecture.png)

---

## Project Setup

Follow these steps to set up and run the project locally or deploy it on Render.

### Prerequisites
- Node.js (preferably the latest version).
- Git (to clone the repository).
- A ScrapeGraph.ai account for the API key.

### Steps to Run Locally

 **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/reviews-scraper.git
   cd reviews-scraper

  **WBSCPR is also hosted at https://wbscrxper.onrender.com/ using Render**

 
