---
title: How To InstallBook Stack
date: 2023-09-02 6:00:00 +0300
categories: [Projects, Solution, Open-Source, WIKI]
tags: [documentation]
---

# Book Stack

**Simple & Free Wiki Software**
BookStack is a simple, self-hosted, easy-to-use platform for organising and storing information.

![Book Stack](/assets/img/posts/bookstack/bookstack-hero-screenshot.webp "Book Stack").

## installation

### Docker

Since it's a new ubuntu machine will start by install docker at first

```bash

sudo apt-get update && sudo apt-get install ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

sudo docker run hello-world

```

### Bookstack

we will use github.com/solidnerd/docker-bookstack
auther of this repo <https://twitter.com/solidnerd>

```bash
mkdir /opt/bookstack
cd /opt/bookstack
git clone https://github.com/solidnerd/docker-bookstack.git
cd docker-bookstack
nano docker-compose.yml

```

change
APP_URL=<https://example.com>
to
APP_URL=<http://192.168.45.137:8080>

``` bash
sudo docker compose up -d
sudo docker ps
```

## Access UI

<http://192.168.45.137:8080>

username: <admin@admin.com>
password: password
