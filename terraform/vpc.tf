resource "aws_vpc" "blog-vpc" {
  cidr_block = var.production-vpc.cidr

  tags = {
    Name        = "${var.environment[terraform.workspace]}-blog-vpc"
    Environment = var.environment[terraform.workspace]
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.blog-vpc.id

  tags = {
    Name        = "${var.environment[terraform.workspace]}-blog-igw"
    Environment = var.environment[terraform.workspace]
  }
}

resource "aws_subnet" "for-lambda" {
  vpc_id            = aws_vpc.blog-vpc.id
  cidr_block        = "10.0.0.0/24"
  availability_zone = "ap-northeast-1a"

  tags = {
    Name        = "${var.environment[terraform.workspace]}-subnet-for-lambda"
    Environment = var.environment[terraform.workspace]
  }
}

# local向きのルートはどうなっているか調べる
resource "aws_route_table" "for-lambda" {
  vpc_id = aws_vpc.blog-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name        = "${var.environment[terraform.workspace]}-route-table-for-lambda"
    Environment = var.environment[terraform.workspace]
  }
}

resource "aws_route_table_association" "for-lambda" {
  subnet_id      = aws_subnet.for-lambda.id
  route_table_id = aws_route_table.for-lambda.id
}

resource "aws_subnet" "for-rds" {
  count             = length(var.production-vpc.subnets)
  vpc_id            = aws_vpc.blog-vpc.id
  cidr_block        = values(var.production-vpc.subnets)[count.index].cidr
  availability_zone = values(var.production-vpc.subnets)[count.index].availability_zone

  tags = {
    Name        = "${var.environment[terraform.workspace]}-subnet-for-rds"
    Environment = var.environment[terraform.workspace]
  }
}

resource "aws_route_table" "for-rds" {
  vpc_id = aws_vpc.blog-vpc.id

  tags = {
    Name        = "${var.environment[terraform.workspace]}-route-table-for-rds"
    Environment = var.environment[terraform.workspace]
  }
}

resource "aws_route_table_association" "for-rds" {
  count          = 2
  subnet_id      = aws_subnet.for-rds[count.index].id
  route_table_id = aws_route_table.for-rds.id
}

resource "aws_security_group" "for-lambda" {
  name        = "${var.environment[terraform.workspace]}-sg-for-lambda"
  description = "Allow TLS inbound traffic"
  vpc_id      = aws_vpc.blog-vpc.id

  ingress {
    description = "TLS from Internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.environment[terraform.workspace]}-sg-for-lambda"
    Environment = var.environment[terraform.workspace]
  }
}

resource "aws_security_group" "for-rds" {
  name        = "${var.environment[terraform.workspace]}-sg-for-rds"
  description = "Allow TLS inbound traffic"
  vpc_id      = aws_vpc.blog-vpc.id

  ingress {
    description     = "TLS from Internet"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.for-lambda.id]
  }

  tags = {
    Name        = "${var.environment[terraform.workspace]}-sg-for-rds"
    Environment = var.environment[terraform.workspace]
  }
}
