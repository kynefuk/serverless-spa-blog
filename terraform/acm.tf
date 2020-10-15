resource "aws_acm_certificate" "cert" {
  # domain_name       = aws_route53_record.frontend.name
  domain_name       = var.domain[terraform.workspace]
  validation_method = "DNS"
  provider          = aws.virginia

  lifecycle {
    create_before_destroy = true
  }
}


resource "aws_acm_certificate_validation" "wait-validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.validation_record.fqdn]
  provider                = aws.virginia
}
