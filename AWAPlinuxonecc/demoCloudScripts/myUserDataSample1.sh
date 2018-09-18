#!/bin/sh
echo "anything you would like to do" > /tmp/myscriptResult.txt
# Minimal Swap file creation
dd if=/dev/zero of=/swapfile bs=1024 count=262144
mkswap /swapfile
chmod 0600 /swapfile
swapon /swapfile