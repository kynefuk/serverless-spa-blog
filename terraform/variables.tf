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

variable "production-vpc" {
  default = {
    name = "production-vpc"
    cidr = "10.0.0.0/16"
    subnets = {
      subnet1 = {
        availability_zone = "ap-northeast-1a"
        cidr              = "10.0.1.0/24"
      }
      subnet2 = {
        availability_zone = "ap-northeast-1c"
        cidr              = "10.0.2.0/24"
      }
    }
  }
}

variable "db_master_user" {}

variable "db_master_password" {}
