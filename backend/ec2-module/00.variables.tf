variable "aws_region" {
  description = "Region de AWS"
  default     = "us-east-2"
}

variable "aws_ami" {
  description = "Imagen para el servidor"
  default     = "ami-0862be96e41dcbf74"
}

variable "aws_instance_type" {
  description = "Tipo de instancia para el servidor"
  default     = "t2.micro"
}

variable "sv_name" {
  description = "Nombre del servidor"
  default     = "youdrive-api"
}

variable "duckdns_token" {
  description = "Token de duckdns"
}
