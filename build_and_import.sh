#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCKERFILES_DIR="$ROOT_DIR/dockerfiles"
SERVICES_DIR="$ROOT_DIR/services"

echo "=== Building Docker images ==="

# Frontend
docker build -t local/frontend:latest "$DOCKERFILES_DIR/frontend"

# API (Dockerfile from dockerfiles/api, context from services/api)
docker build -t local/api:latest -f "$DOCKERFILES_DIR/api/Dockerfile" "$SERVICES_DIR/api"

# Worker
docker build -t local/worker:latest "$DOCKERFILES_DIR/worker"

echo "=== Exporting and importing images into containerd ==="
for IMAGE in frontend api worker; do
  TAR_FILE="$ROOT_DIR/${IMAGE}.tar"
  docker save "local/$IMAGE:latest" -o "$TAR_FILE"
  sudo k3s ctr images import "$TAR_FILE"
  rm -f "$TAR_FILE"
done

echo "=== Restarting Kubernetes deployments ==="
for IMAGE in frontend api worker; do
  kubectl rollout restart deployment "$IMAGE" -n test-app || true
done

echo "=== All done ==="
