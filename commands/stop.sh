#!/bin/bash

echo "Stopping server container..."
docker compose down

echo "Removing images..."
docker rmi -f $(docker images -aq)

echo "Pruning volumes..."
docker volume prune -f

