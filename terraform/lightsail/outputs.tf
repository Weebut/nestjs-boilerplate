output "db_host" {
  value = aws_lightsail_database.db.master_endpoint_address
}

output "services" {
  value = aws_lightsail_container_service.services
}
