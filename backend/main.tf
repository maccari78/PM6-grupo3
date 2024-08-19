terraform {
  backend "s3" {
    bucket = "terraform-emacuello-tfstate"
    key    = "youdrive/terraform.tfstate"
    region = "us-east-2"
  }
}

module "ec2-module" {
  source = "./ec2-module"

  aws_region        = var.aws_region
  aws_ami           = var.aws_ami
  aws_instance_type = var.aws_instance_type
  sv_name           = var.sv_name
  duckdns_token     = var.duckdns_token
}

# module "render-module" {
#   source = "./render-module"

#   RENDER_API_KEY   = var.RENDER_API_KEY
#   RENDER_OWNER_ID  = var.RENDER_OWNER_ID
#   env_file_content = file(var.env_file_content)
# }

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





