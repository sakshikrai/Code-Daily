#!/usr/bin/env bash
# exit on error
set -o errexit

# Install the Dart SDK
apt-get update && apt-get install -y apt-transport-https
sh -c 'wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -'
sh -c 'wget -qO- https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list'
apt-get update && apt-get install -y dart

# Install npm dependencies
npm install