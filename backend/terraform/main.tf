provider "aws" {
  region = "eu-west-1" # Remplace par ta région
}

resource "aws_instance" "node_app" {
  ami           = "ami-0c55b159cbfafe1f0" # Remplace par l'AMI d'Ubuntu ou une autre selon ta préférence
  instance_type = "t2.micro" # Type d'instance, 't2.micro' est éligible à l'offre gratuite

  # Configuration du groupe de sécurité
  vpc_security_group_ids = [aws_security_group.node_app_sg.id]

  # Déployer des scripts pour installer Node.js et démarrer l'application
  user_data = <<-EOF
              #!/bin/bash
              sudo apt update
              sudo apt install -y nodejs npm
              mkdir /home/ubuntu/app
              cd /home/ubuntu/app
              git clone https://gitlab.com/OsmanNuri/empty.git . # Remplace par l'URL de ton dépôt
              npm install
              nohup node index.js > output.log 2>&1 &
              EOF

  tags = {
    Name = "NodeApp"
  }
}

resource "aws_security_group" "node_app_sg" {
  name_prefix = "node_app_sg_"
  
  ingress {
    from_port   = 3000 # Remplace par le port de ton application
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Ouvre à tout le monde, à utiliser avec précaution
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # Permet tout le trafic sortant
    cidr_blocks = ["0.0.0.0/0"]
  }
}
