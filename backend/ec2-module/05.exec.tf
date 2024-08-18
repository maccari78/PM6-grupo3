resource "null_resource" "wait_for_user_data" {
  provisioner "remote-exec" {
    inline = [
      "while [ ! -f /home/ubuntu/user_data_complete ]; do echo 'esperando a que se complete el script de inicializacion de la maquina...'; sleep 10; done"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("${var.sv_name}.key")
      host        = aws_instance.youdrive-api.public_ip
    }
  }

  depends_on = [aws_instance.youdrive-api]
}

resource "null_resource" "copy_file" {
  provisioner "local-exec" {
    environment = {
      duckdns_token = var.duckdns_token
    }
    command = "scp -i ${var.sv_name}.key -o StrictHostKeyChecking=no .env.prod ubuntu@${aws_instance.youdrive-api.public_ip}:/home/ubuntu && scp -i ${var.sv_name}.key -o StrictHostKeyChecking=no duckdns.env ubuntu@${aws_instance.youdrive-api.public_ip}:/home/ubuntu"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo mv /home/ubuntu/.env.prod /home/ubuntu/backendpf/.env.development",
      "sudo mv /home/ubuntu/duckdns.env /home/ubuntu/backendpf/duckdns.env",
      "sudo chown ubuntu:ubuntu /home/ubuntu/backendpf/.env.development",
      "sudo chown ubuntu:ubuntu /home/ubuntu/backendpf/duckdns.env",
      "sudo chmod 644 /home/ubuntu/backendpf/.env.development",
      "sudo chmod 644 /home/ubuntu/backendpf/duckdns.env",
      "cd /home/ubuntu/backendpf",
      "sudo chmod +x /home/ubuntu/backendpf/curl-duck.sh",
      "sudo chmod 644 docker-compose.yml",
      "sudo chown -R ubuntu:ubuntu /home/ubuntu/backendpf",
      "sudo /home/ubuntu/backendpf/curl-duck.sh",
      "sleep 5",
      "sudo docker-compose up -d"
    ]


    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("${var.sv_name}.key")
      host        = aws_instance.youdrive-api.public_ip
    }
  }

  depends_on = [null_resource.wait_for_user_data]
}
