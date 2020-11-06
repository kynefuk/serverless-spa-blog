resource "aws_rds_cluster" "aurora-cluster" {
  cluster_identifier              = "${var.environment[terraform.workspace]}-cluster"
  engine_mode                     = "serverless"
  availability_zones              = ["ap-northeast-1a", "ap-northeast-1c"]
  database_name                   = "blog"
  master_username                 = var.db_master_user
  master_password                 = var.db_master_password
  apply_immediately               = true
  db_cluster_parameter_group_name = aws_rds_cluster_parameter_group.default.id
  backup_retention_period         = 0
  preferred_backup_window         = "02:00-02:30"
  preferred_maintenance_window    = "Sun:04:00-Sun:04:30"
  db_subnet_group_name            = aws_db_subnet_group.default.id
  source_region                   = "ap-northeast-1"
  deletion_protection             = false
  enable_http_endpoint            = true
  storage_encrypted               = true
  vpc_security_group_ids          = [aws_security_group.for-rds.id]
  final_snapshot_identifier       = "${var.environment[terraform.workspace]}-cluster-final-snapshot"
  skip_final_snapshot             = false

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
