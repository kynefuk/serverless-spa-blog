variable "example_name" {
  type = map(string)
  default = {
    default = "default"
    stg     = "stg"
  }
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${terraform.workspace}-frontend-origin"
  acl    = "private"

  tags = {
    Name        = "${terraform.workspace}-blog"
    Environment = terraform.workspace
  }
}
