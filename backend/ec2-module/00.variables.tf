variable "aws-region" {
  description = "Region de AWS"
  default     = "us-east-2"
}

variable "aws-ami" {
  description = "Imagen para el servidor"
  default     = "ami-0862be96e41dcbf74"
}

variable "aws-instance-type" {
  description = "Tipo de instancia para el servidor"
  default     = "t2.micro"
}

variable "sv_name" {
  description = "Nombre del servidor"
  default     = "youdrive-api"
}
