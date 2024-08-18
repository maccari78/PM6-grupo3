resource "aws_instance" "youdrive-api" {
  ami                    = var.aws_ami
  instance_type          = var.aws_instance_type
  user_data              = <<-EOF
              #!/bin/bash
              # Actualizar la lista de paquetes
              sudo apt-get update -y
              
              sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common git              
              
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
              
              sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

              # Actualizar la lista de paquetes nuevamente
              sudo apt-get update -y

              # Instalar Docker
              sudo apt-get install -y docker-ce

              # Agregar el usuario ubuntu al grupo docker
              sudo usermod -aG docker ubuntu             

              sudo curl -L "https://github.com/docker/compose/releases/download/v2.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              
              sudo systemctl enable docker
              sudo systemctl start docker
              cd /home/ubuntu
              git clone https://github.com/emacuello/backendpf.git
              cd backendpf
              sudo chmod +x ./init-letsencrypt.sh
              docker --version
              docker-compose --version
              git --version
          
              touch /home/ubuntu/user_data_complete
              EOF
  key_name               = aws_key_pair.youdrive-api-ssh.key_name
  vpc_security_group_ids = [aws_security_group.youdrive-api-sg.id]

  tags = {
    Name        = var.sv_name
    Environment = "prod"
    Owner       = "emacuello.link"
    Team        = "Grupo-4"
    Project     = "YouDrive"
  }
}
