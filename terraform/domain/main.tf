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

# target domain registration

data "aws_route53_zone" "main" {
  name         = var.root_domain
}

resource "aws_route53_record" "target" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.target_domain
  type    = "A"
  alias {
    name                   = "init-dev-lightsail-server.4ji27vahngo3e.ap-northeast-2.cs.amazonlightsail.com"
    zone_id                = var.lightsail_zone_id
    evaluate_target_health = true
  }
}

# resource "aws_route53_zone" "target" {
#   name = var.target_domain
#   tags = local.tags
# }

# resource "aws_route53_record" "target" {
#   zone_id = data.aws_route53_zone.main.zone_id
#   name    = var.target_domain
#   type    = "NS"
#   ttl     = 172800
#   records = [
#     aws_route53_zone.target.name_servers[0],
#     aws_route53_zone.target.name_servers[1],
#     aws_route53_zone.target.name_servers[2],
#     aws_route53_zone.target.name_servers[3],
#   ]
# }

# certificate registration

# resource "aws_acm_certificate" "target_cert" {
#   domain_name       = var.target_domain
#   subject_alternative_names = []
#   validation_method = "DNS"

#   lifecycle {
#     create_before_destroy = true
#   }
#   tags = local.tags
# }

# resource "aws_route53_record" "target_cert" {
#   for_each = {
#     for dvo in aws_acm_certificate.target_cert.domain_validation_options : dvo.domain_name => {
#       name    = dvo.resource_record_name
#       record  = dvo.resource_record_value
#       type    = dvo.resource_record_type
#       zone_id = aws_route53_zone.target.zone_id
#     }
#   }

#   allow_overwrite = true
#   name            = each.value.name
#   records         = [each.value.record]
#   ttl             = 60
#   type            = each.value.type
#   zone_id         = each.value.zone_id
# }

# resource "aws_acm_certificate_validation" "target" {
#   certificate_arn         = aws_acm_certificate.target_cert.arn
#   validation_record_fqdns = [for record in aws_route53_record.target_cert : record.fqdn]
# }
