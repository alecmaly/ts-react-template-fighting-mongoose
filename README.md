# Template Project
This is a template project for building TypeScript React applications.
API server can handle authentication with various Oauth providers. 

## Dependencies

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/)
- [Terraform](https://www.terraform.io/downloads.html) OR docker-compose

## Run Instructions

### Clone Git repo
```
git clone https://github.com/alecjmaly/ts-react-template.git && cd ts-react-template
```

### Install node dependencies
```
npm run install_all
```

### Build
Builds projects accounting to each build script. Typically involves webpack or tsc build steps.
```
npm run build_all
```

### Dockerize and push containers to hub
You will want to change the name of containers from alecmaly/xxxxx to your account. 
```
npm run dockerize_all
```

## Run containers

#### Run with Terraform
``` python
terraform init        # init terraform
terraform apply       # starts orchastration
terraform destroy     # destroys instances
```

#### Run with docker-compose
```
docker-compose up
```

### More Info
To check running docker containers
```
docker ps
```
