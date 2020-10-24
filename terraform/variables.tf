variable "frontend" {
  type = map(string)
  default = {
    stg  = "kata-oji.com"
    prod = "kata-oji.dev"
  }
}

variable "backend" {
  type = map(string)
  default = {
    stg  = "api.kata-oji.com"
    prod = "api.kata-oji.dev"
  }
}
