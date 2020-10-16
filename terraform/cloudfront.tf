resource "aws_cloudfront_origin_access_identity" "frontend" {
  comment = "Frontend origin access identity."
}

resource "aws_cloudfront_distribution" "frontend_distribution" {
  origin {
    domain_name = aws_s3_bucket.frontend_origin.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.frontend_origin.id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.frontend.cloudfront_access_identity_path
    }
  }

  enabled             = true
  default_root_object = "index.html"
  aliases             = [var.domain[terraform.workspace]]

  # logging_config {
  #   include_cookies = false
  #   bucket          = aws_s3_bucket.cloudfront_log.bucket_domain_name
  #   prefix          = "access-log/"
  # }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.frontend_origin.id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "https-only"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["JP"]
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }
}
