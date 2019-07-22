## Docker functions

Build docker container - this configuration is built for docker-compose
```
docker build --rm -f Dockerfile -t alecmaly/loadbalancer .
```
Push docker image to repo
```
docker push alecmaly/loadbalancer
```
Run Docker container on port 80 (of docker-machine) -- creates new instance of docker image
```
docker run --rm -d -p 8080:8080 alecmaly/loadbalancer
```

## TO DO

Update for Terraform
