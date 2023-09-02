---
title: How To Install And Configure Velociraptor On Ubuntu
date: 2023-09-02 5:00:00 +0300
categories: [Projects, Solution, Open-Source, Endpoint, Forensics]
tags: [Velociraptor, Monitor, Collect, Hunt, DFIR]
---

# Velociraptor - Digging Deeper

![Velociraptor](/assets/img/posts/velo/velo.png "Velociraptor").

## Install and Configure Velociraptor

check release on github.com/Velocidex/velociraptor/releases and then install the required packages
up to this time V0.7.0 is available so we will install it

``` bash

cd /opt
mkdir Velo
cd /Velo
wget https://github.com/Velocidex/velociraptor/releases/download/v0.7.0/velociraptor-v0.7.0-linux-amd64
cp velociraptor-v0.7.0-linux-amd64 /usr/local/bin/velociraptor
chmod +x /usr/local/bin/velociraptor
velociraptor config generate -i
```

Configuration part "just follow the steps and customize your option like UI ip | username & password"

``` bash
root@velo:/opt/Velo# velociraptor config generate -i
?
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

```

replace bind_address: 127.0.0.1 with your-server-ip

## Create a Systemd Service File for Velociraptor

``` bash
nano /lib/systemd/system/velociraptor.service

```

and add the below then save the file

``` bash

[Unit]
Description=Velociraptor linux amd64
After=syslog.target network.target

[Service]
Type=simple
Restart=always
RestartSec=120
LimitNOFILE=20000
Environment=LANG=en_US.UTF-8
ExecStart=/usr/local/bin/velociraptor --config /opt/server.config.yaml frontend -v

[Install]
WantedBy=multi-user.target
```

``` bash
systemctl daemon-reload
systemctl enable --now velociraptor
systemctl status velociraptor
```

``` bash
● velociraptor.service - Velociraptor linux amd64
     Loaded: loaded (/lib/systemd/system/velociraptor.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2023-09-01 19:30:53 UTC; 33s ago
   Main PID: 24738 (velociraptor)
      Tasks: 16 (limit: 2196)
     Memory: 67.8M
        CPU: 9.260s
     CGroup: /system.slice/velociraptor.service
             ├─24738 /usr/local/bin/velociraptor --config /opt/Velo/server.config.yaml frontend -v
             └─24744 /usr/local/bin/velociraptor --config /opt/Velo/server.config.yaml frontend -v

Sep 01 19:30:57 velo velociraptor[24738]: [INFO] 2023-09-01T19:30:57Z Upgrading tool Autorun_386 {"Tool":{"name":"Autorun_386","url":"https://live.sysinternals.com/tools/autorunsc.exe","serve_locally":true>
Sep 01 19:30:57 velo velociraptor[24738]: [INFO] 2023-09-01T19:30:57Z Upgrading tool Autorun_amd64 {"Tool":{"name":"Autorun_amd64","url":"https://live.sysinternals.com/tools/autorunsc64.exe","serve_locally>
Sep 01 19:30:58 velo velociraptor[24738]: [INFO] 2023-09-01T19:30:58Z Compiled all artifacts.
Sep 01 19:30:58 velo velociraptor[24738]: [INFO] 2023-09-01T19:30:58Z CryptoServerManager: Watching for events from Server.Internal.ClientDelete
Sep 01 19:30:58 velo velociraptor[24738]: [INFO] 2023-09-01T19:30:58Z Throttling connections to 100 QPS
Sep 01 19:30:58 velo velociraptor[24738]: [INFO] 2023-09-01T19:30:58Z Starting gRPC API server on 192.168.45.136:8001
Sep 01 19:30:58 velo velociraptor[24738]: [INFO] 2023-09-01T19:30:58Z Restricting VQL plugins to set [artifact_definitions batch chain client_delete clients clock column_filter combine delay delete_events >
Sep 01 19:30:58 velo velociraptor[24738]: [INFO] 2023-09-01T19:30:58Z Launched Prometheus monitoring server on 127.0.0.1:8003
Sep 01 19:30:58 velo velociraptor[24738]: [INFO] 2023-09-01T19:30:58Z GUI is ready to handle TLS requests on https://192.168.45.136:8889/
Sep 01 19:30:58 velo velociraptor[24738]: [INFO] 2023-09-01T19:30:58Z Frontend is ready to handle client TLS requests at https://192.168.45.136:8000/
```

## Access Velociraptor Web UI

<https://your-server-ip:8889>

user: admin
password: admin
in my case "configured during installation"
