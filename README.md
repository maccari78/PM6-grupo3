## Carrera: Full Stack

# Alquiler de Autos: You Drive 🚍

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

