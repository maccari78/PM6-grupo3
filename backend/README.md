# Terraform + AWS

## Requisitos

- AWS Account
- AWS IAM User con permisos de EC2 y S3 (Opcional)
- Terraform
- Ansible
- AWS CLI con credenciales de IAM
- AWS S3 Bucket para almacenar el estado de la infraestructura (Opcional)

# Configuración

## AWS IAM User

Se necesita un usuario con permisos de EC2 y S3, si no se tiene, puedes crear uno y darle los permisos del archivo `aws-permissions.json`

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

## EC2 Instance

### Requisitos

- DNS, puede ser DuckDNS o Cloudflare o un dominio personalizado, pero está configurado para un subdominio en DuckDNS
- Un archivo `duckdns.env` con las credenciales de DuckDNS con este formato

  ```
  DUCKDNS_TOKEN=tu-token
  ```

Cuando se tenga el subdominio en DuckDNS, se tiene que cambiar la variable del archivo `curl-duck.sh` en la línea 5 y colocar el subdominio que tengas en DuckDNS

### Inicialización

Una vez se cumplen los requisitos, se puede iniciar la instancia con los comandos de terraform

```
terraform init
terraform plan
terraform apply
```

si todo es correcto, el servidor estará disponible en el subdominio que se haya configurado en DuckDNS, esto puede tardar unos minutos en aparecer, si no aparece, ingresar con la ip pública y verificar que el servidor está corriendo, te dará la bienvenida Nginx Proxy Manager

### Nginx Proxy Manager

Documentación: https://nginxproxymanager.com/guide/

Para poder acceder a la interfaz de administración, se debe ingresar al dominio, o a la ip publica, seguido del puerto 81, por ejemplo: http://tu-ip-publica:81

Una vez dentro, te pedira que ingreses con email y contraseña, que por defecto son:

```
Email:    admin@example.com
Password: changeme
```

Luego de cambiar las credenciales, se puede acceder a la interfaz de administración, donde se puede configurar el proxy, el certificado, las reglas de redireccionamiento, etc.

Navega a Hosts -> Proxy Hosts.

Haz clic en Add Proxy Host.

Configura el proxy para la api:

Domain Names: Pon el nombre de dominio o subdominio que quieres usar (por ejemplo, api.duckdns.org).
Scheme: http.
Forward Hostname / IP: youdrive-api (el nombre del servicio den contenedor, otro si lo has cambiado).
Forward Port: 3001.
SSL: Configura SSL si es necesario.
Haz clic en Save.

El proceso es el mismo para el servidor de grafana, solo cambia el dominio y el puerto (3000 segun el compose).

Autor: [Emacuello](https://emacuello.link)
