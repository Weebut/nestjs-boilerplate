# nestjs-boilerplate/terraform

Author: Jaemin Kim

<br/>

## Prerequisites

- Terraform CLI
- AWS CLI

<br/>

## Quick Start

```bash
# setup
/path/to/nestjs-boilerplate/terraform % aws configure --profile init-infra

# infrastructure setup (dev environment)
## initialization
/path/to/nestjs-boilerplate/terraform % terraform init
/path/to/nestjs-boilerplate/terraform % terraform workspace new dev
/path/to/nestjs-boilerplate/terraform % terraform workspace select dev
/path/to/nestjs-boilerplate/terraform % terraform plan -var-file="./vars/dev.tfvars"
/path/to/nestjs-boilerplate/terraform % terraform apply -var-file="./vars/dev.tfvars"

## Each components setup
/path/to/nestjs-boilerplate/terraform/sth % terraform init
/path/to/nestjs-boilerplate/terraform/sth % terraform workspace new dev
/path/to/nestjs-boilerplate/terraform/sth % terraform workspace select dev
/path/to/nestjs-boilerplate/terraform/sth % terraform plan -var-file="../vars/dev.tfvars"
/path/to/nestjs-boilerplate/terraform/sth % terraform apply -var-file="../vars/dev.tfvars"

# local deployment
/path/to/nestjs-boilerplate % docker compose -f docker-compose.dev.yaml up -d

# manual deployment
/path/to/nestjs-boilerplate % aws ecr get-login-password --region ap-northeast-2 --profile init-infra | docker login --username AWS --password-stdin 737930764590.dkr.ecr.ap-northeast-2.amazonaws.com

```
