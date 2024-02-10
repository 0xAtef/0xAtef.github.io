---
title: The Hive Project (SOARing with open source)
date: 2024-02-09 8:00:00 +0300
categories: [Projects, Solution, Open-Source, TheHive]
tags: [TheHive, SOAR, Automation]
---

# What is TheHive

TheHive is a scalable 3-in-1 open source and free Security Incident Response Platform designed to make life easier for SOCs, CSIRTs, CERTs and any information security practitioner dealing with security incidents that need to be investigated and acted upon swiftly. It is the perfect companion to MISP. You can synchronize it with one or multiple MISP instances to start investigations out of MISP events. You can also export an investigation's results as a MISP event to help your peers detect and react to attacks you've dealt with. Additionally, when TheHive is used in conjunction with Cortex, security analysts and researchers can easily analyze tens if not hundred of observables.

## Project Prerequisites & Components

5 Linux VM
1 For TheHive-UI
1 For TheHive-BackEnd
1 For Cortex
1 For SOAR (Shuffle & N8N)
1 For MISP

## Installation

### TheHive-BackEnd

#### Dependencies

for DEB

```bash
apt install wget gnupg apt-transport-https git ca-certificates ca-certificates-java curl  software-properties-common python3-pip lsb_release
```

for RPM

```bash
yum install pkg-install gnupg chkconfig python3-pip git
```

##### Java Virtual Machine

for DEB

```bash
wget -qO- https://apt.corretto.aws/corretto.key | sudo gpg --dearmor  -o /usr/share/keyrings/corretto.gpg
echo "deb [signed-by=/usr/share/keyrings/corretto.gpg] https://apt.corretto.aws stable main" |  sudo tee -a /etc/apt/sources.list.d/corretto.sources.list
sudo apt update
sudo apt install java-common java-11-amazon-corretto-jdk
echo JAVA_HOME="/usr/lib/jvm/java-11-amazon-corretto" | sudo tee -a /etc/environment 
export JAVA_HOME="/usr/lib/jvm/java-11-amazon-corretto"
```

for RPM

```bash
sudo rpm --import https://yum.corretto.aws/corretto.key  &> /dev/null
wget -qO-  https://yum.corretto.aws/corretto.repo | sudo tee -a /etc/yum.repos.d/corretto.repo
yum install java-1.11.0-amazon-corretto-devel &> /dev/null
echo JAVA_HOME="/usr/lib/jvm/java-11-amazon-corretto" |sudo tee -a /etc/environment
export JAVA_HOME="/usr/lib/jvm/java-11-amazon-corretto"
```

##### Apache Cassandra

for DEB

Add Apache repository references

```bash
wget -qO -  https://downloads.apache.org/cassandra/KEYS | sudo gpg --dearmor  -o /usr/share/keyrings/cassandra-archive.gpg
echo "deb [signed-by=/usr/share/keyrings/cassandra-archive.gpg] https://debian.cassandra.apache.org 40x main" |  sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list 
```

Install the package

```bash
sudo apt update
sudo apt install cassandra
```

for RPM

Add Cassandra repository keys

```bash
rpm --import https://downloads.apache.org/cassandra/KEYS
Add the Apache repository for Cassandra to /etc/yum.repos.d/cassandra.repo

/etc/yum.repos.d/cassandra.repo
[cassandra]
name=Apache Cassandra
baseurl=https://redhat.cassandra.apache.org/40x/
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://downloads.apache.org/cassandra/KEYS
```

Install the package

```bash
sudo yum install cassandra
```

By default, data is stored in /var/lib/cassandra.

###### Configuration

Configure Cassandra by editing /etc/cassandra/cassandra.yaml file.

```bash
/etc/cassandra/cassandra.yaml
# content from /etc/cassandra/cassandra.yaml
[..]
cluster_name: 'thp'
listen_address: 'xx.xx.xx.xx' # address for nodes
rpc_address: 'xx.xx.xx.xx' # address for clients
seed_provider:
    - class_name: org.apache.cassandra.locator.SimpleSeedProvider
    parameters:
        # Ex: "<ip1>,<ip2>,<ip3>"
        - seeds: 'xx.xx.xx.xx' # self for the first node
data_file_directories:
- '/var/lib/cassandra/data'
commitlog_directory: '/var/lib/cassandra/commitlog'
saved_caches_directory: '/var/lib/cassandra/saved_caches'
hints_directory: 
- '/var/lib/cassandra/hints'
[..]
```

for DEB

```bash
sudo systemctl start cassandra
```

for RPM

```bash
sudo systemctl daemon-reload
sudo service cassandra start
sudo systemctl enable cassandra
```

### TheHive-UI

#### File storage

To store files on the local filesystem, start by choosing the dedicated folder (by default /opt/thp/thehive/files):


```bash
sudo mkdir -p /opt/thp/thehive/files
```

This path will be used in the configuration of TheHive.

Later, after having installed TheHive, ensure the user thehive owns the path chosen for storing files:

```bash
chown -R thehive:thehive /opt/thp/thehive/files
```

#### TheHive

for DEB

```bash
wget -O- https://archives.strangebee.com/keys/strangebee.gpg | sudo gpg --dearmor -o /usr/share/keyrings/strangebee-archive-keyring.gpg

```

for RPM

```bash
sudo rpm --import https://archives.strangebee.com/keys/strangebee.gpg 

```

Install TheHive package by using the following commands:
for DEB

```bash
echo 'deb [signed-by=/usr/share/keyrings/strangebee-archive-keyring.gpg] https://deb.strangebee.com thehive-5.2 main' | sudo tee -a /etc/apt/sources.list.d/strangebee.list
sudo apt-get update
sudo apt-get install -y thehive

```

for RPM

1. Setup your system to connect the RPM repository. Create and edit the file /etc/yum.repos.d/strangebee.repo:

```bash
[thehive]
enabled=1
priority=1
name=StrangeBee RPM repository
baseurl=https://rpm.strangebee.com/thehive-5.2/noarch
gpgkey=https://archives.strangebee.com/keys/strangebee.gpg
gpgcheck=1

```

2. Then install the package using yum:

```bash
sudo yum install thehive
```

##### Configuration

The configuration that comes with binary packages is ready for a standalone installation, everything on the same server.

In this context, and at this stage, you might need to set the following parameters accordingly:

```bash
[..]
# Service configuration
application.baseUrl = "http://localhost:9000" 
play.http.context = "/"                       
[..]
```

Following configurations are required to start TheHive successfully:

- Secret key configuration
- Database configuration
- File storage configuration

##### Secret key configuration

The secret key is automatically generated and stored in /etc/thehive/secret.conf by package installation script.

##### Database & index

By default, TheHive is configured to connect to Cassandra and Elasticsearch databases installed locally.

```bash
# Database and index configuration
# By default, TheHive is configured to connect to local Cassandra 4.x and a
# local Elasticsearch services without authentication.
db.janusgraph {
storage {
    backend = cql
    hostname = ["127.0.0.1"]
    # Cassandra authentication (if configured)
    # username = "thehive"
    # password = "password"
    cql {
    cluster-name = thp
    keyspace = thehive
    }
}
index.search {
    backend = elasticsearch
    hostname = ["127.0.0.1"]
    index-name = thehive
}
}
```

##### File storage

If you chose to store files on the local filesystem:

1. Ensure thehive user has permissions on the destination folder

```bash
chown -R thehive:thehive /opt/thp/thehive/files
```

2. Default values in the configuration file

```bash
/etc/thehive/application.conf
# Attachment storage configuration
# By default, TheHive is configured to store files locally in the folder.
# The path can be updated and should belong to the user/group running thehive service. (by default: thehive:thehive)
storage {
provider = localfs
localfs.location = /opt/thp/thehive/files
}
```

##### Run

```bash
sudo systemctl start thehive
sudo systemctl enable thehive
```

Once it has started, open your browser and connect to http://YOUR_SERVER_ADDRESS:9000/.

The default admin user is admin@thehive.local with password secret. It is recommended to change the default password.

### Cortex

Coming Soon

### SOAR (Shuffle & N8N)

Coming Soon

### MISP

[Link Here](https://0xatef.github.io/posts/MISP-Install/)
