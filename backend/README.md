# Terraform + AWS

## Requisitos

- AWS Account
- AWS IAM User con permisos de EC2
- Terraform
- Ansible
- AWS CLI con credenciales de IAM

## Configuración

## SSH Key Pair

Llave pública para conectarse al servidor, la creamos con el siguiente comando

```
ssh-keygen -t rsa -b 2048 -f "youdrive-api.key"
```

Guardamos la llave pública en un archivo llamado `youdrive-api.key.pub`

### Variables de entorno

terraform.tfvars

```
AWS_REGION=us-east-1
AWS_AMI=ami-0a5b2c1f9f8c8e8b0
AWS_INSTANCE_TYPE=t2.micro
SV_NAME=youdrive-api
```

### Variables

#### aws-region

Region de AWS

#### aws-ami

Imagen para el servidor

#### aws-instance-type

Tipo de instancia para el servidor

#### sv_name

Nombre del servidor

### Provider

```
provider "aws" {
  region = var.aws-region
}
```

### Key Pair

Llave pública para conectarse al servidor

### Security Group

Grupo de seguridad para el servidor, permite el acceso al servidor por ssh y el acceso web

### Outputs

Imprime los valores de las IPs y DNS del servidor

## Deploy

```
# Inicializamos terraform
terraform init
```

```
# Visualizamos los plan de terraform
terraform plan
```

```
# Creamos la infraestructura
terraform apply
```

```
# Visualizamos las IPs y DNS del servidor
terraform output
```

Para conectarse al servidor, usamos el comando ssh con la llave pública

```

ssh -i "youdrive-api.key" ubuntu@tu-ip-publico

```

El ip público es la que se muestra en la salida de terraform o con el comando `terraform output`

Autor: [Emacuello](https://emacuello.link)
