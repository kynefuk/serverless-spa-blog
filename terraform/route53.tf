
data "aws_route53_zone" "primary" {
  name = var.domain[terraform.workspace]
}

resource "aws_route53_record" "frontend" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = var.domain[terraform.workspace]
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.frontend_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}


resource "aws_route53_record" "validation_record" {
  name    = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_name
  type    = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_type
  records = [tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_value]
  zone_id = data.aws_route53_zone.primary.zone_id
  ttl     = 60
}
