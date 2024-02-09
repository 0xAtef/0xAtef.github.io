---
title: How To Install And Configure Velociraptor Client On Ubuntu
date: 2023-09-05 5:00:00 +0300
categories: [Projects, Solution, Open-Source, Endpoint, Forensics]
tags: [Velociraptor, Monitor, Collect, Hunt, DFIR]
---

# Velociraptor - Digging Deeper

![Velociraptor](/assets/img/posts/velo/velo.png "Velociraptor").

## Install and Configure Velociraptor server

check release on github.com/Velocidex/velociraptor/releases and then install the required packages
up to this time V0.7.0 is available so we will install it

``` bash

cd /opt
wget https://github.com/Velocidex/velociraptor/releases/download/v0.7.0/velociraptor-v0.7.0-linux-amd64
chmod +x velociraptor-v0.7.0-linux-amd64
./velociraptor-v0.7.0-linux-amd64 config generate -i
```

Configuration part "just follow the steps and customize your option like UI ip | username & password"

``` bash
Welcome to the Velociraptor configuration generator
---------------------------------------------------

I will be creating a new deployment configuration for you. I will
begin by identifying what type of deployment you need.


What OS will the server be deployed on?
 linux
? Path to the datastore directory. /opt/velociraptor
?  Self Signed SSL
? What is the public DNS name of the Master Frontend (e.g. www.example.com): your ip address
? Enter the frontend port to listen on. 8000
? Enter the port for the GUI to listen on. 8889
? Are you using Google Domains DynDNS? No
? GUI Username or email address to authorize (empty to end): your user name
? GUI Username or email address to authorize (empty to end):
[INFO] 2023-09-01T19:27:29Z  _    __     __           _                  __
[INFO] 2023-09-01T19:27:29Z | |  / /__  / /___  _____(_)________ _____  / /_____  _____
[INFO] 2023-09-01T19:27:29Z | | / / _ \/ / __ \/ ___/ / ___/ __ `/ __ \/ __/ __ \/ ___/
[INFO] 2023-09-01T19:27:29Z | |/ /  __/ / /_/ / /__/ / /  / /_/ / /_/ / /_/ /_/ / /
[INFO] 2023-09-01T19:27:29Z |___/\___/_/\____/\___/_/_/   \__,_/ .___/\__/\____/_/
[INFO] 2023-09-01T19:27:29Z                                   /_/
[INFO] 2023-09-01T19:27:29Z Digging deeper!                  https://www.velocidex.com
[INFO] 2023-09-01T19:27:29Z This is Velociraptor 0.7.0 built on 2023-08-28T01:49:41Z (ac56954)
[INFO] 2023-09-01T19:27:29Z Generating keys please wait....
? Path to the logs directory. /opt/velociraptor/logs
? Do you want to restrict VQL functionality on the server?

This is useful for a shared server where users are not fully trusted.
It removes potentially dangerous plugins like execve(),filesystem access etc.
 Yes
? Where should I write the server config file? server.config.yaml
? Where should I write the client config file? client.config.yaml

```

``` bash

nano server.config.yaml

./velociraptor-v0.7.0-linux-amd64 --config server.config.yaml debian server --binary velociraptor-v0.6.4-2-linux-amd64

dpkg -i velociraptor_0.6.4-2_server.deb

systemctl status velociraptor_server



```

## Access Velociraptor Web UI

<https://your-server-ip:8889>

user: admin
password: admin
in my case "configured during installation"


## deploy client Debian Package

```bash

./velociraptor-v0.7.0-linux-amd64 --config client.config.yaml debian client
```

```bash
dpkg -i velociraptor_0.6.4-2_client.deb
```

## deploy client Red Hat Package

```bash
./velociraptor-v0.7.0-linux-amd64 --config client.config.yaml rpm client

``` 

```bash
sudo rpm -i velociraptor_x.x.x_client.rpm


```