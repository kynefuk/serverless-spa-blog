variable "cert" {
  type = map(string)
  default = {
    default = "default"
    stg     = "kata-oji.com"
  }
}

resource "aws_acm_certificate" "cert" {
  # domain_name       = aws_route53_record.frontend.name
  domain_name       = var.cert[terraform.workspace]
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}


resource "aws_acm_certificate_validation" "wait-validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.validation_record.fqdn]
}
