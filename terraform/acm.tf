resource "aws_acm_certificate" "frontend" {
  domain_name       = var.frontend[terraform.workspace]
  validation_method = "DNS"
  provider          = aws.virginia

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "wait-validation-frontend" {
  certificate_arn         = aws_acm_certificate.frontend.arn
  validation_record_fqdns = [aws_route53_record.frontend-validation-record.fqdn]
  provider                = aws.virginia
}

resource "aws_acm_certificate" "backend" {
  domain_name       = var.backend[terraform.workspace]
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [aws_route53_zone.blog-domain, aws_route53_record.backend-name-server]
}

resource "aws_acm_certificate_validation" "wait-validation-backend" {
  certificate_arn         = aws_acm_certificate.backend.arn
  validation_record_fqdns = [aws_route53_record.backend-validation-record.fqdn]

  depends_on = [aws_route53_zone.blog-domain, aws_route53_record.backend-name-server, aws_route53_record.backend-validation-record]
}
