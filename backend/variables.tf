variable "aws_region" {
  description = "Region de AWS"
  type        = string
}

variable "aws_ami" {
  description = "Imagen para el servidor"
  type        = string
}

variable "aws_instance_type" {
  description = "Tipo de instancia para el servidor"
  type        = string
}

variable "sv_name" {
  description = "Nombre del servidor"
  type        = string
}

variable "RENDER_API_KEY" {
  description = "The API key for Render"
  type        = string
}

variable "env_file_content" {
  description = "Path to the environment file"
  type        = string
}

variable "bucket_name" {
  description = "Bucket name"
  type        = string
}

variable "RENDER_OWNER_ID" {
  description = "The owner ID for Render"
  type        = string
}

variable "duckdns_token" {
  description = "Token de duckdns"
  type        = string
}
