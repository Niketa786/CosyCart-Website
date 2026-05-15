# CosyCart 🛒 - Full-Stack E-Commerce Platform

CosyCart is a modern full-stack e-commerce application. Users can browse premium products, manage their profiles, place orders, and track them in real-time. It also includes a dedicated Admin Dashboard for order management.

---

## 🌟 Features
* **User Profiles & Orders:** View previous order history and current status.
* **Order Cancellation:** Capability to cancel orders within a 24-hour window.
* **Admin Dashboard:** Manage orders by updating status to **Shipped**, **Delivered**, or **Cancelled**.
* **Real-time Tracking:** Visual progress bars to monitor order updates.

---

## 🛠️ Technologies Used
* **Frontend:** React.js, Bootstrap, Axios
* **Backend:** Java, Spring Boot, Spring Data JPA
* **Database:** MySQL
* **Tools:** Spring Tool Suite (STS), VS Code, Git

---

## 💻 Setup and Installation

### 1. Database Setup
* Create a MySQL database: `CREATE DATABASE cosycart_db;`
* Update your MySQL username and password in `src/main/resources/application.properties`.

### 2. Backend Setup (Spring Boot)
1. Import the `CosyCart-Server` folder into STS or IntelliJ.
2. Install Maven dependencies.
3. Run `CosyCartApplication.java` (The server runs on port **8080**).

### 3. Frontend Setup (React)
1. Navigate to the `cosycart-frontend` directory in your terminal.
2. Run the following commands:
   ```bash
   npm install
   npm start
