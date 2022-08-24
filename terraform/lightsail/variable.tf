variable "profile" {
  type    = string
  default = "init-infra"
}

variable "environment" {
  type    = string
  default = "dev"
}

variable "region" {
  type    = string
  default = "ap-northeast-2"
}

variable "database_config" {
  type = object({
    password = string
    username = string
    name = string
    rdb_name = string
    bundle_id = string
    version = string
    type = string
    azs = string
  })
}

variable "container_services" {
  type    = list(object({
    name = string
    certificate_name = string
    domain_name = string
    alt_names = list(string)
    domain_names = list(string)
    scale = number
    power = string
  }))
}
