# Crear un bucket de s3 para guardar el estado de la infraestructura
# terraform {
#   backend "s3" {
#     bucket = "tu-bucket-de-s3"
#     key    = "youdrive/terraform.tfstate"
#     region = "us-east-2"
#   }
# }

module "ec2-module" {
  source = "./ec2-module"

  aws-region        = "us-east-2"
  aws-ami           = "ami-0862be96e41dcbf74"
  aws-instance-type = "t2.micro"
  sv_name           = "youdrive-api"
}

output "ec2-module-public-ip" {
  description = "Ip publica del servidor"
  value       = module.ec2-module.youdrive-api-public-ip
}

output "ec2-module-private-ip" {
  description = "Ip privada del servidor"
  value       = module.ec2-module.youdrive-api-private-ip
}

output "ec2-module-public-dns" {
  description = "DNS publica del servidor"
  value       = module.ec2-module.youdrive-api-public-dns
}





