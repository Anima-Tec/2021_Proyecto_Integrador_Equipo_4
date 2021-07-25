#!/bin/dash

#Updates all the installed packages to the latest version
echo Preparing system to install enviroment...
sleep 1
sudo yum update

#Install Apache Web Server
echo Installing Apache...
sleep 1
sudo yum install httpd
sudo systemctl start httpd.service
sudo systemctl enable httpd.service

#Install MariaDB server
echo Installing MariaDB...
sleep 1
sudo yum install mariadb-server
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql_secure_installation

#Install php
echo installing php
sleep 1
sudo yum install php
sudo systemctl restart httpd.service 

sudo systemctl restart httpd.service

#Install Open SSH Server
sudo yum install openssh-server

clear

echo Enviroment installation finished

sleep 2

echo Configuring SSH server...

#Backup SSH config
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

#SSH configuration
sudo adduser user
sudo passwd user

sed -i '/PermitRootLogin yes/c\PermitRootLogin no' /etc/ssh/sshd_config
sed -i '/PasswordAuthentication no/c\PasswordAuthentication yes' /etc/ssh/sshd_config

UUID=`uuidgen`
echo "
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s3
UUID=$UUID
DEVICE=enp0s3
ONBOOT=yes
IPADDR=192.168.1.4
PREFIX=24
GATEWAY=192.168.1.1
DNS1=192.168.1.1
DNS2=8.8.8.8
" > /etc/sysconfig/network-scripts/ifcfg-enp0s3

yum install network-scripts

systemctl restart network

echo Finished SSH server configuration 
sleep 2

clear

