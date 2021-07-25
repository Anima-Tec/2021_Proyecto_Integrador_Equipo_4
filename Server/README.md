# Enviroment Instalation

**To run this script you need use root.** \
You need to run the next command line inside the folder that contains enviromentInstall.sh:
```bash
sh enviromentConfig.sh
```
At the same time that this install, the SSH server is configured.

# SSH Server use

You only need to run these command lines:
##### Centos server SSH service start:
```bash
systemctl start sshd
```
##### Connect to ssh server from cmd on windows:
```bash
ssh user@192.168.1.4 -p 22
```
##### If you get an error along the lines of "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED", then run this:
```bash
ssh-keygen -R "192.168.1.4"
```
