export interface SearchResult {
  posts: Post[];
  cars: Car[];
}

export interface Post {
  id: string;
  title: string; // Ajusta según los datos reales de tus posts
  description: string; // Ajusta según los datos reales de tus posts
  price: number;
  car: Car; // Ajusta según los datos reales de tus posts
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  color: string;
  availability: boolean;
  image_url: string[]; // Puede ser un array de URLs de imágenes
  public_id: string[]; // Puede ser un array de IDs de imágenes
  created_at: string; // Puede ser un string o un objeto Date
  updated_at: string; // Puede ser un string o un objeto Date
  isDeleted: boolean;
  post: Post[];
  // Agrega más propiedades según los datos reales de tus cars
}
