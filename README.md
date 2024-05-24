## Carrera: Full Stack

# Alquiler de Autos: YouDrive 🚍

## Integrantes del equipo: 
- Geronimo Kramar - Front End
- Camila Fabre - Front End
- Camilo Sierra - Front End
- Victor Emanuel Elias Cuello - Back End
- Juan Carlos Alvarez Martinez - Back End
- Darvin Ricardo Alania Inoecencio - Back End
- Danilo Maccari - Back End

## Caso de negocio
El proyecto se enfoca en el sector de alquiler de rodados, un área que actualmente enfrenta desafíos como la falta de transparencia y eficiencia en la gestión de alquileres. Estamos desarrollando esta aplicación para abordar la necesidad de una plataforma integral que facilite la conexión entre propietarios y arrendatarios de manera segura y eficiente. El sitio web ofrecerá soluciones como la gestión de pagos automatizados, y un sistema de calificaciones y reseñas para ambas partes.

## Funcionalidades
- Requisitos tech
¿Cómo lo aplicarán? (Idea boceto)
Autenticación propia y externa. Persistencia de sesión.
Autenticación con Auth0 
Notificaciones vía mail
Mailer
Almacenamiento de archivos (en cloud). El almacenamiento de imágenes será en Cloudinary, un servidor externo.
Información de la aplicación lo almacenaremos en el PostgreSQL 
Usuario administrador con su respectivo dashboard
Autentificación en el front donde dependiendo el usuario se muestran los datos del dashboard.
Documentación. De la aplicación en general y se puede sumar OpenAPI o herramienta similar para backend
Figma donde se haga un modelo de las vistas y Open API para el back
Mercadopago o Paypal
Despliegue de la totalidad de proyecto
Despliegue en Vercel (front) back investigar (Railway o Render).
ChatBot. No necesariamente con IA pero si se puede, mejor. Que al menos pueda tomar datos y responder preguntas básicas a seleccionar.
Chat usuario/usuario o usuario/admin. Usando websockets y Socket.IO

Sistema de notificación automática de manera periódica (uso de crons). 
Ejemplos/propuestas:
- Newsletter diario
- Implementación de promociones

Implementación de herramientas Google Cloud.
Ejemplos/propuestas:
Google Maps
Detección de contenido inadecuado en textos y/o imágenes
Speech-to-Text / Text-to-Speech
Implementar Google Maps para la localización de los productos alquilados

Investigar y aplicar una nueva tecnología. 
Propuestas:
GraphQL
Prisma
Otros FW de Frontend como Vue o Angular
React Native

## Historias de usuario
- Como Invitado quiero poder ingresar a una publicación para ver sus detalles.
- Como Invitado quiero poder registrarme para tener acceso a la plataforma y sus servicios.
- Como Usuario  quiero poder iniciar sesión para acceder a mis datos personales y acceder a funcionalidades exclusivas.
- Como Usuario  quiero poder cerrar sesión para proteger mi cuenta y mis datos personales cuando termine de usar la aplicación.
- Como Usuario logueado quiero poder publicar un auto para poder alquilarlo.
- Como Usuario logueado quiero poder ver publicaciones para alquilar autos registrados dentro de la plataforma.
- Como  Usuario logueado puedo comentar y dar reseñas a publicaciones para expresar mi opinión y compartir mi experiencia.
- Como Usuario logueado quiero dejar comentarios en las publicaciones para calificar al propietario del auto.
- Como Usuario logueado quiero poder reservar un auto para tener un vehículo siempre disponible si lo necesito.
- Como Usuario logueado quiero poder cancelar una reserva para ajustar mis planes en caso de un imprevisto.
- Como Usuario logueado quiero poder modificar mis datos de usuario para mantener actualizado el perfil.
- Como Usuario logueado quiero poder visualizar mi historial de alquileres en mi dashboard/perfil para revisar transacciones pasadas.
- Como Administrador quiero poder modificar los productos de ser necesario para mantener información actualizada.
- Como Administrador quiero poder eliminar publicaciones de ser necesario para asegurar que mi plataforma cuente con los mejores productos.
- Como Administrador quiero poder visualizar la información de todos los usuarios para supervisar la actividad de la plataforma.
- Como Administrador quiero poder cambiar roles de únicamente usuarios para asignar permisos necesarios según sea el caso.
- Como SuperAdministrador quiero poder cambiar roles para asignar permisos tanto de usuarios como de administradores.
- Como SuperAdministrador  quiero poder eliminar roles para mantener la seguridad del sitio.

## Documentación del proyecto:  OPCIONAL
Únicamente si han cumplido con las secciones obligatorias al pie de la letra los invitamos a incluir al menos una versión inicial de:
- Wireframe en Figma (Iniciado o avanzado)
- Diagrama de arquitectura (General, incluyendo módulos de backend)
- DER (Entidades presentes en la aplicación)

Incluir los links con acceso público en todos los casos que consideres necesarios.

## Configuración Inicial del Proyecto
- Clonar el repositorio:

## Cada miembro del equipo debe clonar el repositorio en su máquina local usando el comando:
- git clone https://github.com/tu-usuario/nombre-del-repo.git

## Configurar las ramas principales:
Decide las ramas principales (por ejemplo, main y develop).
El creador del repositorio debería crear estas ramas si aún no existen:
- git checkout -b develop
- git push origin develop

## Flujo de Trabajo con GitHub
Feature branches (ramas de características):

## Para cada nueva característica o corrección de errores, los desarrolladores deben crear una nueva rama a partir de develop:
- git checkout -b feature/nombre-de-la-caracteristica

## Realizar cambios y commits:
Haz los cambios necesarios en tu rama y realiza commits frecuentemente con mensajes descriptivos:
- git add .
- git commit -m "Descripción clara de los cambios"

## Pushear la rama al repositorio remoto:

## Sube tus cambios a tu rama en GitHub:
- git push origin feature/nombre-de-la-caracteristica
- Pull Request (PR):

## Una vez que una característica esté lista, abre un Pull Request en GitHub desde tu rama hacia develop.
- Describa los cambios en el PR y solicita revisiones de tus compañeros de equipo.
- Revisión y aprobación del código:

## Los compañeros de equipo revisarán el PR, dejarán comentarios y solicitarán cambios si es necesario.
- Una vez aprobados, se puede fusionar (merge) el PR en develop.
- 

# Integración Continua y Despliegue
- Configurar CI/CD:
- Utiliza herramientas como GitHub Actions para configurar la integración continua.
- Configura un flujo de trabajo que ejecute pruebas y despliegue automáticamente si es necesario.

## Resolución de Conflictos
Mantén tu rama actualizada:

## Antes de abrir un PR, asegúrate de que tu rama esté actualizada con develop:
- git fetch origin
- git checkout develop
- git pull origin develop
- git checkout feature/nombre-de-la-caracteristica
- git merge develop

## Resolución de conflictos:
Si hay conflictos durante el merge, resuélvelos en tu máquina local y realiza un nuevo commit con los cambios resueltos.

# Buenas Prácticas
- Realiza commits frecuentemente con cambios pequeños y bien descritos.
- Código limpio y documentado:
Asegúrate de que tu código sea limpio y esté bien documentado.

## Revisar y testear:
- Siempre revisa y prueba tu código antes de abrir un PR.


