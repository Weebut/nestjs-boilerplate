terraform {
  backend "s3" {
    bucket               = "init-tf-state-bucket"
    workspace_key_prefix = "environments"
    key                  = "lightsail"
    region               = "ap-northeast-2"
    encrypt              = true
    dynamodb_table       = "terraform-lock"
    profile              = "init-infra"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.27.0"
    }
    awslightsail = {
      source = "deyoungtech/awslightsail"
    }
  }
}

provider "aws" {
  region  = var.region
  profile = var.profile
}

provider "aws" {
  alias = "global"
  region  = "us-east-1"
  profile = var.profile
}

locals {
  name = "init-${var.environment}-lightsail"
  tags = {
    Name        = "init-lightsail"
    Environment = var.environment
  }
}

resource "aws_lightsail_domain" "target" {
  provider = aws.global
  for_each = toset([ for domain in distinct(flatten([ for deployment in var.container_services : deployment["domain_names"]])) : domain ])
  domain_name = each.key
}

resource "aws_lightsail_container_service" "services" {
  for_each = { for service in var.container_services : service.name => service }
  name        = "${local.name}-${each.value.name}"
  power       = each.value.power
  scale       = each.value.scale
  is_disabled = false

  public_domain_names {
    certificate {
      # should create certificate
      certificate_name = each.value.certificate_name
      domain_names = each.value.domain_names
    }
  }

  tags = local.tags
  depends_on = [
    aws_lightsail_domain.target,
    # awslightsail_certificate.target
  ]
}

resource "aws_lightsail_database" "db" {
  availability_zone    = var.database_config.azs
  master_database_name = var.database_config.name
  relational_database_name = var.database_config.rdb_name
  master_password      = var.database_config.password
  master_username      = var.database_config.username
  blueprint_id         = "${var.database_config.type}_${join("_",split(".",var.database_config.version))}"
  bundle_id            = var.database_config.bundle_id

  tags = local.tags
}
