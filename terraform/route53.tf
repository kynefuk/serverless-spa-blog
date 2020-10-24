
data "aws_route53_zone" "frontend" {
  name = var.frontend[terraform.workspace]
}

resource "aws_route53_record" "frontend" {
  zone_id = data.aws_route53_zone.frontend.zone_id
  name    = var.frontend[terraform.workspace]
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.frontend_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "backend-name-server" {
  zone_id = data.aws_route53_zone.frontend.zone_id
  name    = var.backend[terraform.workspace]
  type    = "NS"

  records = [
    aws_route53_zone.backend.name_servers[0],
    aws_route53_zone.backend.name_servers[1],
    aws_route53_zone.backend.name_servers[2],
    aws_route53_zone.backend.name_servers[3]
  ]

  depends_on = [aws_route53_zone.backend]
}

resource "aws_route53_zone" "backend" {
  name = var.backend[terraform.workspace]
}

resource "aws_route53_record" "frontend-validation-record" {
  name    = tolist(aws_acm_certificate.frontend.domain_validation_options)[0].resource_record_name
  type    = tolist(aws_acm_certificate.frontend.domain_validation_options)[0].resource_record_type
  records = [tolist(aws_acm_certificate.frontend.domain_validation_options)[0].resource_record_value]
  zone_id = data.aws_route53_zone.frontend.zone_id
  ttl     = 60
}

resource "aws_route53_record" "backend-validation-record" {
  name    = tolist(aws_acm_certificate.backend.domain_validation_options)[0].resource_record_name
  type    = tolist(aws_acm_certificate.backend.domain_validation_options)[0].resource_record_type
  records = [tolist(aws_acm_certificate.backend.domain_validation_options)[0].resource_record_value]
  zone_id = aws_route53_zone.backend.zone_id
  ttl     = 60

  depends_on = [aws_route53_zone.backend]
}
