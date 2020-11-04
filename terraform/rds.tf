resource "aws_rds_cluster" "aurora-cluster" {
  cluster_identifier        = "${var.environment[terraform.workspace]}-cluster"
  engine                    = "aurora-mysql"
  engine_version            = "5.7.12"
  engine_mode               = "serverless"
  availability_zones        = ["ap-northeast-1a", "ap-northeast-1c"]
  database_name             = "blog"
  master_username           = var.db_master_user
  master_password           = var.db_master_password
  apply_immediately         = true
  backup_retention_period   = 5
  preferred_backup_window   = "07:00-09:00"
  db_subnet_group_name      = aws_db_subnet_group.default.id
  final_snapshot_identifier = "${var.environment[terraform.workspace]}-cluster-final-snapshot"
  skip_final_snapshot       = false
  source_region             = "ap-northeast-1"

  scaling_configuration {
    auto_pause               = true
    max_capacity             = 1
    min_capacity             = 1
    seconds_until_auto_pause = 300
  }

  tags = {
    Name        = "${var.environment[terraform.workspace]}-aurora-cluster"
    Environment = var.environment[terraform.workspace]
  }
}

resource "aws_db_subnet_group" "default" {
  name       = "${var.environment[terraform.workspace]}-subnet-group"
  subnet_ids = [for subnet in aws_subnet.for-rds : subnet.id]

  tags = {
    Name        = "${var.environment[terraform.workspace]}-subnet-group"
    Environment = var.environment[terraform.workspace]
  }
}

resource "aws_rds_cluster_parameter_group" "default" {
  name        = "${var.environment[terraform.workspace]}-parameter-group"
  family      = "aurora5.6"
  description = "${var.environment[terraform.workspace]}-parameter-group"

  parameter {
    name         = "character_set_server"
    value        = "utf8mb4"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "character_set_connection"
    value        = "utf8mb4"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "character_set_database"
    value        = "utf8mb4"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "character_set_results"
    value        = "utf8mb4"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "skip-character-set-client-handshake"
    value        = "1"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "character_set_client"
    value        = "utf8mb4"
    apply_method = "pending-reboot"
  }
}

resource "aws_rds_cluster_instance" "cluster_instance" {
  count              = 1
  identifier         = "${var.environment[terraform.workspace]}-instance"
  cluster_identifier = aws_rds_cluster.aurora-cluster.id
  instance_class     = "db.t3.micro"
  engine             = aws_rds_cluster.aurora-cluster.engine
  engine_version     = aws_rds_cluster.aurora-cluster.engine_version

  tags = {
    Name        = "${var.environment[terraform.workspace]}-instance"
    Environment = var.environment[terraform.workspace]
  }
}
