#!/bin/bash

cd /home/ubuntu/backendpf

DUCKDNS_DOMAIN="youdrive-api.duckdns.org"

if [ -f "/home/ubuntu/backendpf/duckdns.env" ]; then
  export $(grep -v '^#' /home/ubuntu/backendpf/duckdns.env | xargs)
else
  echo "El archivo duckdns.env no se encuentra en /home/ubuntu."
  exit 1
fi

if [ -z "$DUCKDNS_TOKEN" ]; then
  echo "El token de DuckDNS no está definido."
  exit 1
fi

IP=$(curl -s http://ifconfig.me)
IP=$(echo "$IP" | tr -d '[:space:]')
DUCKDNS_TOKEN=$(echo "$DUCKDNS_TOKEN" | tr -d '[:space:]')

sleep 1

echo "IP: $IP"
echo "DUCKDNS_TOKEN: $DUCKDNS_TOKEN"

URL1="https://www.duckdns.org/update?domains=$DUCKDNS_DOMAIN&token=$DUCKDNS_TOKEN&ip=$IP"

echo "URL1: $URL1"

response1=$(curl -v -s "$URL1")
echo "Respuesta 1: $response1"


sleep 30

echo "Curl completado"