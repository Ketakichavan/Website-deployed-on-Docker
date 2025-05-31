# Website-deployed-on-Docker
This project is a Django web application containerized with Docker and deployed on an AWS EC2 instance.

##  Deployment Guide

###  Step 1: Create EC2 Instance

1. Go to the **AWS EC2 Console**
2. Launch an instance (**Ubuntu 22.04 or 24.04**)
3. Allow inbound traffic on:
   - **Port 22** (SSH)
   - **Port 8000** (Web access)

---

###  Step 2: SSH Into EC2

---

ssh -i your-key.pem ubuntu@your-ec2-public-ip

### Step 3: Install Docker and Docker Compose
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker ubuntu
newgrp docker

---

### Step 4: Prepare Django Project for Docker

Create the following structure inside your local project directory:

  1. Dockerfile
    FROM python:3.11-slim
    
    WORKDIR /app
    
    ENV PYTHONUNBUFFERED=1
    ENV PYTHONPATH=/app
    
    RUN apt-get update && apt-get install -y \
        build-essential \
        pkg-config \
        default-libmysqlclient-dev \
        && apt-get clean \
        && rm -rf /var/lib/apt/lists/*
    
    COPY requirements.txt /app/
    RUN pip install --upgrade pip && pip install -r requirements.txt
    
    COPY allplants/ /app/
    
    RUN python manage.py collectstatic --noinput || true
    
    EXPOSE 8000
    
    CMD ["gunicorn", "plant.wsgi:application", "--bind", "0.0.0.0:8000"]
  
  
  2. requirements.txt
    Generate with:
  
      pip freeze > requirements.txt
  
  
  3. docker-compose.yml
  
    version: '3.8'
    
    services:
      web:
        build: .
        ports:
          - "8000:8000"
        volumes:
          - .:/code

---

### Step 5 - settings.py Configuration
Temporarily allow all hosts:
  ALLOWED_HOSTS = ['*']

---

### Step 6 - Copy Project to EC2
From your local terminal:
  scp -i "your/path/to/key.pem" -r "project/folder/path" ubuntu@your-ec2-public-ip:~/

---

### Step 7 - Build and Run Docker on EC2
cd proj/
docker-compose up --build

---

### Step 8 - Access Your Project
Open your browser and paste the below link:
  http://'your-ec2-public-ip':8000/
