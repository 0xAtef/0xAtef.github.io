---
title: How To MISP
date: 2025-04-24 7:30:00 +0200
categories: [Projects, Solution, Open-Source, MISP, TIP]
tags: [documentation]
---


# Installing MISP Using Docker

MISP (Malware Information Sharing Platform & Threat Sharing) is an open-source platform designed for sharing structured threat intelligence. By utilizing Docker, the deployment process of MISP becomes simplified, encapsulating all the necessary components into containers. In this guide, we will walk you through the steps required to deploy MISP using Docker.

## Prerequisites

Before starting, ensure you have the following:

- A Linux-based server (Ubuntu is recommended)
- Docker and Docker Compose installed
- Basic understanding of command-line operations

## Steps to Install MISP Using Docker

### 1. Clone the MISP Docker Repository

Start by cloning the official MISP Docker repository from GitHub:

```bash
git clone https://github.com/MISP/MISP-docker.git
cd MISP-docker
```

### 2. Configure Environment Variables

Next, copy the example environment file to `.env`:

```bash
cp .env.example .env
```

Then, modify the `.env` file to configure your MISP instance. You will need to set up the following parameters:

- **Database settings**: Ensure the database credentials are properly configured.
- **Timezone**: Set the appropriate timezone for your server.
- **Redis settings**: Ensure Redis settings are aligned with your environment.

Use any text editor to modify the `.env` file:

```bash
nano .env
```

### 3. Launch MISP Using Docker Compose

Once the `.env` file is configured, use Docker Compose to build and start the containers:

```bash
docker-compose up -d
```

or

```bash
docker compose up -d
```

This will launch the MISP platform and its required services, such as the database and Redis, in detached mode (background).

### 4. Access MISP

To access MISP, open a web browser and navigate to:

```http
https://<YOUR_SERVER_IP>
```

Log in using the default credentials:

- **Username**: `admin@admin.test`
- **Password**: `admin`

### 5. Configuring MISP

Once logged in, you can configure your MISP instance by:

- Setting up **API keys** for integrations with other platforms.
- Configuring **feeds** to pull in external threat intelligence data.

### 6. Updating MISP

To keep your MISP instance up-to-date, follow these steps:

1. Pull the latest changes from the MISP repository:

    ```bash
    git pull origin master
    ```

2. Restart the MISP containers to apply the updates:

    ```bash
    docker-compose down
    docker-compose up -d
    ```

    or

    ```bash
    docker compose down
    docker compose up -d
    ```

This ensures your MISP instance is running the latest version with all updates.
