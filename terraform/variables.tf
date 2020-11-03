variable "environment" {
  type = map(string)
  default = {
    stg  = "stg"
    prod = "prod"
  }
}

variable "frontend" {
  type = map(string)
  default = {
    stg  = "kata-oji.com"
    prod = "naaam.dev"
  }
}

variable "backend" {
  type = map(string)
  default = {
    stg  = "api.kata-oji.com"
    prod = "api.naaam.dev"
  }
}

variable "db_master_user" {}

variable "db_master_password" {}
