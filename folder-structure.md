k8s-realworld/
├─ README.md
├─ Makefile
├─ dockerfiles/
│ ├─ api/Dockerfile
│ ├─ worker/Dockerfile
│ └─ frontend/Dockerfile
├─ services/
│ ├─ api/ (nodejs express)
│ ├─ worker/ (python redis consumer)
│ └─ frontend/ (static html+js)
└─ k8s/
├─ namespace.yaml
├─ storageclass-local.yaml
├─ postgres-statefulset.yaml
├─ redis-deployment.yaml
├─ api-deployment.yaml
├─ frontend-deployment.yaml
├─ worker-deployment.yaml
├─ services.yaml
├─ ingress.yaml
├─ hpa.yaml
├─ pdb.yaml
├─ networkpolicy.yaml
├─ configmap.yaml
├─ secret.yaml
├─ serviceaccount-role-rb.yaml
├─ cronjob.yaml
├─ job.yaml
└─ README_DEPLOY.md
