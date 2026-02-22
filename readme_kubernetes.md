# Fullstack Authors Books Application - Kubernetes Deployment

## 📌 Project Overview

This project demonstrates how to containerize and deploy a Fullstack Application (Frontend + Backend + MySQL) using Docker, AWS ECR, and Kubernetes (EKS).

The application consists of:
- React (Vite) Frontend
- Node.js + Express Backend
- MySQL Database

---

## 🏗 Architecture

Browser  
↓  
Node Public IP : 30300 (NodePort)  
↓  
Frontend (Nginx Container)  
↓ /api  
Backend Service (ClusterIP)  
↓  
MySQL Service (ClusterIP)

---

## 🐳 Step 1: Dockerize the Application

### Backend Dockerfile

- Uses Node 18 image
- Installs dependencies
- Runs server.js
- Exposes port 80

### Frontend Dockerfile (Multi-stage)

- Builds production React app
- Uses Nginx to serve static files
- Configured reverse proxy for backend

---

## 🔧 Configuration Changes

### Backend DB Configuration

Updated `backend/configs/db.js`:

```js
host: 'mysql-service'
```

(Localhost does not work in Kubernetes)

---

### Frontend .env

```
VITE_API_URL=/api
```

---

### Nginx Reverse Proxy

Configured in `nginx.conf`:

```
location /api {
    proxy_pass http://backend-service;
}
```

---

## 📦 Step 2: Build Docker Images

```
docker build -t backend-app ./backend
docker build -t frontend-app ./frontend
```

---

## 🚀 Step 3: Push to AWS ECR

```
docker tag backend-app:latest <ECR-URL>
docker tag frontend-app:latest <ECR-URL>

docker push <ECR-URL>
```

---

## ☸ Step 4: Deploy to Kubernetes

### Deploy MySQL

```
kubectl apply -f mysql.yml
```

### Import Database

```
kubectl cp backend/db.sql <mysql-pod>:/db.sql
kubectl exec -it <mysql-pod> -- mysql -u root -p react_node_app < /db.sql
```

### Deploy Backend

```
kubectl apply -f backend.yml
```

### Deploy Frontend (NodePort)

```
kubectl apply -f frontend.yml
```

---

## 🌍 Access Application

```
http://<node-public-ip>:30300
```

---

## 📚 Key Learnings

- Docker multi-stage builds
- Kubernetes Service types (ClusterIP, NodePort)
- Internal service communication using DNS
- Reverse proxy with Nginx
- Environment variable handling in Vite
- MySQL integration inside Kubernetes

---

## 🎯 Outcome

Successfully deployed a production-ready 3-tier application on Kubernetes using Docker and AWS ECR.
