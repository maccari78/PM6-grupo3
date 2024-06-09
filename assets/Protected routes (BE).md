# Posts
- get/posts (publica)
- post/posts (protegida users, admin)
- get/posts/filter (publica)
- get/posts/id (publica)
- put/posts/id (protegida)
- delete/posts/id (protegida usuario, admin)

# Notifications
- (protegida solo admin)

# Users
- get/users (protegida admin)
- get/users/token (protegida admin)
- get/users/id administrador. Por ahora publica
- delete/users/id (protegida admin)
- put/users/update (protegida users, admin)

# Endpoint para obtener usuario por username publica retorna foto de perfil, ubicación, reviews, posts

# Rentals
- post/rentals/id (protegida users, admin)
- get/rentals/id (protegida users, admin)
- put/rentals/id (protegida users, admin)
- delete/rentals/id (protegida users, admin)
- get/rentals (protegida users, admin)
- get/rentals/success/id (protegida users, admin)
- get/rentals/cancel/id (protegida users, admin)

# Addresses
- Protegidas todas, findAll únicamente para admin

# Cars
- post/cars (protegida users, admin)
- get/cars (protegida users, admin)
- get/cars/filter (protegida users, admin)
- get/cars/id (protegida users, admin)
- delete/cars/id (protegida users, admin)

# Reviews
- post/reviews/id (protegida users, admin)
- get/reviews/id (publica)
- put/reviews/id (protegida users, admin)
- delete/reviews/id (protegida users, admin)

# Files
- (protegida users, admin)

# Auth
- (protegida users, admin)

# Chat
- get/chat/id/messages (protegida users, admin)
