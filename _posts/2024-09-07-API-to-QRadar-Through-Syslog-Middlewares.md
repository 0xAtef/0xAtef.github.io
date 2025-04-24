---
title: How Send A Logs From API To Qradar SIEM Through Syslog Middleware
date: 2024-09-07 7:00:00 +0200
categories: [Projects, Solution, Integrations, Syslog, API, Middleware]
tags: [Integrations]
---

# How to Send Logs From an API to QRadar SIEM Through Syslog Middleware

## In this guide, you will learn how to send logs from an API to IBM QRadar SIEM using a syslog middleware approach. We'll walk through extracting the logs from an API, preparing them in the proper format, and sending them to QRadar.

![Qradar](/assets/img/posts/Qradar/API%20to%20Syslog/API%20to%20QRadar%20Through%20Middlewares.png "Qradar").


## Get Logs or Required Data from Api

The first step is to gather the data or logs you need from the API. In this example, we are querying a dummy API for user data. The response will be parsed and used later to send to QRadar.

### Request Logs

```python
import requests
import json

# Dummy API endpoint
url = "https://api.example.com/dummy-endpoint"

# Headers
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer dummy_token"
}

# Payload data to send with the request
payload = {
    "action": "get_users"
}

# Sending a POST request
response = requests.post(url, headers=headers, data=json.dumps(payload))

# Assume the response contains a list of users
dummy_response = response.json()

```

### Returned Logs in json

Once the request is sent, the API will return the logs in JSON format, which might look like this:

```json
  {
      "status": "success",
      "data": {
          "user_id": 12345,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "role": "admin",
          "preferences": {
              "notifications": true,
              "theme": "dark",
              "language": "en-US"
          },
          "account_created": "2024-01-15T10:30:00Z"
      },
      "message": "Data retrieved successfully"
  }
```

## Parse Logs from json

Now that we have the response from the API, we need to extract the fields from the JSON data that we want to send to QRadar. In this case, we will extract user-specific information such as **user_id**, **name**, **email**, and **role**.

```python
for user in dummy_response["data"]["users"]:
    # Extract and save required fields 
    
    user_id = user["user_id"]
    name = user["name"]
    email = user["email"]
    role = user["role"]
    
```

This step prepares the extracted data for logging.

## Preparing the logger

Here, we set up a logger that can send logs over syslog to QRadar. We configure the logger with the necessary QRadar IP and port settings and create a syslog handler that will format the messages correctly.

```python
import logging
import logging.handlers

# Configuration
QRADAR_IP = 'xx.xx.xx.xx'
QRADAR_PORT = 'xxx'

# Create a logger
logger = logging.getLogger('Test')
logger.setLevel(logging.INFO)

# Create a syslog handler
syslog_handler = logging.handlers.SysLogHandler(address=(QRADAR_IP, QRADAR_PORT))
formatter = logging.Formatter('%(asctime)s %(name)s: %(message)s', datefmt='%b %d %H:%M:%S')
syslog_handler.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(syslog_handler)

# Send a test message
# the below logger will be replaced with the actual log
logger.info('Test message to QRadar')

print("Message sent to QRadar.")


```

This configuration ensures that the logs are properly formatted and sent to QRadar via syslog.

## Send to Qradar in LEEF Format

Next, we need to format the logs in the LEEF (Log Event Extended Format), which is the required format for QRadar to properly parse and process the logs. Below is how you can send user information in LEEF format using the logger.

```python
    # Log the user information in LEEF format
    logger.info(
        "LEEF:2.0|User_Management|1.0|USER_INFO|" +
        "user_id=" + str(user_id) +
        "\tname=" + str(name) +
        "\temail=" + str(email) +
        "\trole=" + str(role)
    )
```

In this example, the log message is structured using the LEEF standard, which QRadar can understand. The format includes information such as the **user ID**, **name**, **email**, and **role**.

## Full Script

Here’s the full script that integrates all the steps above. This script pulls user data from the API, parses it, and sends it to QRadar in the correct format using syslog.

```python
import requests
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

# Dummy API endpoint (This is a placeholder URL, replace with a real one)
url = "https://api.example.com/dummy-endpoint"

# Headers (optional)
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer dummy_token"
}

# Payload data to send with the request
payload = {
    "action": "get_users"
}

# Sending a POST request
response = requests.post(url, headers=headers, data=json.dumps(payload))

# Parse the JSON response
dummy_response = response.json()

# Assuming the response contains a list of users
for user in dummy_response["data"]["users"]:
    # Extract user fields from the response
    user_id = user.get("user_id", "N/A")
    name = user.get("name", "N/A")
    email = user.get("email", "N/A")
    role = user.get("role", "N/A")

    # Log the user information in LEEF format
    logger.info(
        "LEEF:2.0|User_Management|1.0|USER_INFO|" +
        "user_id=" + str(user_id) +
        "\tname=" + str(name) +
        "\temail=" + str(email) +
        "\trole=" + str(role)
    )

print("Message sent to QRadar.")

```
