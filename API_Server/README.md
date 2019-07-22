# Express Authentication Server

- Express
- PostgreSQL (knex/objection)
- Oauth with Passport

#### Info
An HTTP Only JWT is passed back to client. This auth server should be hosted on a subdomain such as login.domain.com

#### Note
Change public.key and private.key in prod




## knex functions
migrate latest
```
knex migrate:latest
```

run seeds
```
knex seed:run
```

## Docker functions

Build docker container
```
docker build --rm -f Dockerfile -t alecmaly/dockerized-api .
```
Push to repo
```
docker push alecmaly/dockerized-api
```
Run Docker container on port 80 (of docker-machine) -- creates new instance of docker image
```
docker run --rm -d -p 3000:3000 alecmaly/dockerized-api
```
Images
```
docker ps             # view running containers
docker logs <id>      # view logs of container
docker images         # view docker images
```

## Docker Compose

Run docker with postgres database
```
docker-compose up
```

## Terraform
build environment
```
terraform plan
terraform apply
terraform destroy
```

## TO DO
- Convert to TypeScript
- Azure Pipeline (test, build, push)
- Dockerize


