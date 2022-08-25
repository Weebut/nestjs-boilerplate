terraform {
  backend "s3" {
    bucket               = "init-tf-state-bucket"
    workspace_key_prefix = "environments"
    key                  = "domain"
    region               = "ap-northeast-2"
    encrypt              = true
    dynamodb_table       = "terraform-lock"
    profile              = "init-infra"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region  = var.region
  profile = var.profile
}

locals {
  name = "init-${var.environment}-domain"
  tags = {
    Name        = "init-domain"
    Environment = var.environment
  }
}

data "terraform_remote_state" "lightsail" {
  backend = "s3"
  config = {
    bucket               = "init-tf-state-bucket"
    key                  = "environments/${var.environment}/lightsail"
    region = "ap-northeast-2"
  }
}

# target domain registration

data "aws_route53_zone" "main" {
  name         = var.root_domain
}

resource "aws_route53_record" "target" {
  for_each = {for domain_map in flatten([for service in var.container_services: [for domain in service.domain_names: {domain= domain, service=service}]]) : domain_map.domain => domain_map.service}
  zone_id = data.aws_route53_zone.main.zone_id
  name    = trim(replace(each.key,var.root_domain,""),".")
  type    = "A"
  alias {
    name                   = trim(data.terraform_remote_state.lightsail.outputs.services[each.value.name].url,"https://")
    zone_id                = var.lightsail_zone_id
    evaluate_target_health = true
  }
}
