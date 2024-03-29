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

```

각 terraform module 별 배포 순서는 ecr -> lightsail -> domain -> (직접 lightsail 콘솔에서 이미지 설정) -> lightsail/deploy 이다
