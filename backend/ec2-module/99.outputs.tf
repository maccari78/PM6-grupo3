output "youdrive-api-public-ip" {
  description = "Ip publica del servidor"
  value       = aws_instance.youdrive-api.public_ip
}

output "youdrive-api-private-ip" {
  description = "Ip privada del servidor"
  value       = aws_instance.youdrive-api.private_ip
}

output "youdrive-api-public-dns" {
  description = "DNS publica del servidor"
  value       = aws_instance.youdrive-api.public_dns
}
