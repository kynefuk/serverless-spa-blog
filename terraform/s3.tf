resource "aws_s3_bucket" "frontend_origin" {
  bucket = "${terraform.workspace}-frontend-origin"
  acl    = "private"

  tags = {
    Name        = "${terraform.workspace}-blog"
    Environment = terraform.workspace
  }
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket              = aws_s3_bucket.frontend_origin.id
  block_public_acls   = true
  block_public_policy = true
}

data "aws_iam_policy_document" "frontend" {
  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.frontend_origin.id}/*"]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.frontend.iam_arn]
    }
  }
}
resource "aws_s3_bucket_policy" "cloudfront-to-s3" {
  bucket = aws_s3_bucket.frontend_origin.id
  policy = data.aws_iam_policy_document.frontend.json
}


resource "aws_s3_bucket" "cloudfront_log" {
  bucket = "${terraform.workspace}-cloudfront-log-bucket"
  acl    = "private"

  tags = {
    Name        = "${terraform.workspace}-blog"
    Environment = terraform.workspace
  }
}

# data "aws_iam_policy_document" "cloudfront_log" {
#   statement {
#     effect    = "Allow"
#     actions   = ["s3:PutObject", "s3:GetBucketAcl", "s3:PutBucketAcl"]
#     resources = ["${aws_s3_bucket.cloudfront_log.arn}/*"]
#     principals {
#       type        = "AWS"
#       identifiers = [aws_cloudfront_origin_access_identity.frontend.iam_arn]
#     }
#   }
# }
# resource "aws_s3_bucket_policy" "cloudfront_log" {
#   bucket = aws_s3_bucket.cloudfront_log.id
#   policy = data.aws_iam_policy_document.cloudfront_log.json
# }
