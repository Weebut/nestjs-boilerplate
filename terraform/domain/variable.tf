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

variable "root_domain" {
  type    = string
  default = "commit-today.com"
}

variable "target_domain" {
  type    = string
  default = "test.commit-today.com"
}

variable "lightsail_zone_id" {
  type    = string
  default = "Z06260262XZM84B2WPLHH"
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
