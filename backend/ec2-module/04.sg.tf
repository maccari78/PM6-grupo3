resource "aws_security_group" "youdrive-api-sg" {
  name        = "${var.sv_name}-sg"
  description = "Habilita los puertos para el acceso web y ssh"

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.sv_name}-sg"
    Environment = "prod"
    Owner       = "emacuello.link"
    Team        = "Grupo-4"
    Project     = "YouDrive"
  }
}
