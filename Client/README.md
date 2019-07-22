# React TS Template

## Info

This is a starter template when using
- React
- TypeScript
- Jest and Enzyme
- Webpack
- Docker

## Test, Build, and Run Using Docker

Run tests
```
npm run test
```

Build package
```
npm run build
```

Build docker container
```
docker build --rm -f Dockerfile -t alecmaly/dockerized-app .
```
Run Docker container on port 80 (of docker-machine) -- creates new instance of docker image
```
docker run --rm -d -p 80:80 alecmaly/dockerized-app
```

#### Useful Docker commands 
Get docker IP (to view app)
```
docker-machine ip
```

Get docker containers
```
docker container ls
```

Kill docker container instance
```
docker kill CONTAINER_ID
```

## To do:

Need to add Azure Pipeline, SCSS?, Passport/Oauth, GraphQL.

[+] API Server



