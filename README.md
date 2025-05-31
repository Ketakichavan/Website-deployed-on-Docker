# Website-deployed-on-Docker
This project is a Django web application containerized with Docker and deployed on an AWS EC2 instance.

##  Deployment Guide

###  Step 1: Create EC2 Instance

1. Go to the **AWS EC2 Console**
2. Launch an instance (**Ubuntu 22.04 or 24.04**)
3. Allow inbound traffic on:
   - **Port 22** (SSH)
   - **Port 8000** (Web access)
![Screenshot 2025-05-31 104243](https://github.com/user-attachments/assets/77f6f8fa-82b1-41d8-9ab2-f936b49c9f24)

---

###  Step 2: SSH Into EC2
ssh -i your-key.pem ubuntu@your-ec2-public-ip
![image](https://github.com/user-attachments/assets/b24e0707-4489-4db6-8bf3-5e9a9dab1491)


---

### Step 3: Install Docker and Docker Compose
sudo apt update

sudo apt install -y docker.io docker-compose

sudo usermod -aG docker ubuntu

newgrp docker

![image](https://github.com/user-attachments/assets/14dde699-e9cb-4445-bb9b-7e58805dc893)

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

  ![image](https://github.com/user-attachments/assets/9d758b2f-52d8-48b0-9caa-540e3ad09730)


---

### Step 6 - Copy Project to EC2
From your local terminal:
  scp -i "your/path/to/key.pem" -r "project/folder/path" ubuntu@your-ec2-public-ip:~/
  ![image](https://github.com/user-attachments/assets/23175679-9004-4f75-a591-a213619d0d69)

---

### Step 7 - Build and Run Docker on EC2
cd proj/allplants/
docker-compose up --build

![image](https://github.com/user-attachments/assets/c7252f53-0bbf-4f0b-b36b-296772d30c59)


---

### Step 8 - Access Your Project
Open your browser and paste the below link:
  http://'your-ec2-public-ip':8000/
  ![image](https://github.com/user-attachments/assets/018d17d0-5087-4dbd-b2e0-85d947324a5a)

