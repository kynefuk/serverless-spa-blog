output "subnet" {
  value = aws_subnet.for-lambda.id
}

output "security-group" {
  value = aws_security_group.for-lambda.id
}
