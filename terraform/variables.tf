variable "domain" {
  type = map(string)
  default = {
    stg  = "kata-oji.com"
    prod = "kata-oji.dev"
  }
}
