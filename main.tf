variable "host" {
  type = "string"
  default = "192.168.99.100"
}


## database variables 
variable "POSTGRES_USER" {
  type = "string"
  default = "postgres"
}
variable "POSTGRES_DB" {
  type = "string"
  default = "practicedocker"
}
variable "POSTGRES_PASSWORD" {
  type = "string"
  default = "password"
}


# Configure Docker provider and connect to the local Docker socket
provider "docker" {
  host = "tcp://${var.host}:2376"
}



# Create an Nginx container
# resource "docker_container" "nginx" {
#   image = "${docker_image.nginx.latest}"
#   name  = "enginecks"
#   ports {
#     internal = 80
#     external = 80
#   }
# }

# resource "docker_image" "nginx" {
#   name = "nginx:1.11-alpine"
# }





# Create an postgres container
resource "docker_container" "postgres" {
  image = "${docker_image.postgres.latest}"
  name  = "postgres"
  must_run = true
  restart = "always"
  ports {
    internal = 5432
    external = 5432
  }

  ## run commands, set environment variables
  env = [
    "POSTGRES_USER=${var.POSTGRES_USER}",
    "POSTGRES_DB=${var.POSTGRES_DB}",
    "POSTGRES_PASSWORD=${var.POSTGRES_PASSWORD}"
  ]
}

resource "docker_image" "postgres" {
  name = "postgres:latest"
}


# Create an API container
resource "docker_container" "api_server" {
  image = "${docker_image.api_server.latest}"
  # count = 2
  name  = "dockerized-api" #"dockerized-api${count.index}"
  depends_on = ["docker_container.postgres"]
  must_run = true
  restart = "always"
  ports {
    internal = 3000
    external = 8080
  }

  # set environment variables
  env = [
    "DATABASE_URL=postgres://${var.POSTGRES_USER}:${var.POSTGRES_PASSWORD}@${var.host}:5432/${var.POSTGRES_DB}"
  ]

  ## run commands
  command = [
    "npm", "run", "up"
  ]

}

resource "docker_image" "api_server" {
  name = "alecmaly/dockerized-api"
}





# Create an App frontend container
resource "docker_container" "client_app" {
  image = "${docker_image.client_app.latest}"
  name  = "dockerized-client" #"dockerized-api${count.index}"
  must_run = true
  restart = "always"
  ports {
    internal = 80
    external = 80
  }

  # set environment variables
  env = [
    "ROOT_URI=http://localhost"
  ]

  # ## run commands
  # command = [
  #   "npm", "run", "start"
  # ]

}

resource "docker_image" "client_app" {
  name = "alecmaly/dockerized-app"
}
