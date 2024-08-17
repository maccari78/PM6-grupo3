resource "aws_key_pair" "youdrive-api-ssh" {
  key_name   = "${var.sv_name}-ssh"
  public_key = file("${var.sv_name}.key.pub")

  tags = {
    Name        = "${var.sv_name}-ssh"
    Environment = "prod"
    Owner       = "emacuello.link"
    Team        = "Grupo-4"
    Project     = "YouDrive"
  }
}
