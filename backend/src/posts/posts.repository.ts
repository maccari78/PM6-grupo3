import { Repository } from "typeorm";
import {Posts } from "./entities/post.entity";
// import postsssToPreLoad from "./preloadPosts"
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "./dto/create-post.dto";

interface Iposts{
    title: string;
    description: string;
    price: number;
    userId: number;
    carId: number;
    created_at: Date;
    updated_at: Date;
}

@Injectable()
export class PostsRepository {
    constructor(
        @InjectRepository(Posts) private postsRepository: Repository<Posts>) {}
        
        public postsssToPreLoad = [
            {
                title: "2020 Toyota Highlander",
                description:
                  "Spacious and reliable SUV with plenty of room for passengers and cargo. Well-maintained and in excellent condition.",
                price: 29995.0,
                userId: 2,
                carId: 12345, // Hypothetical car ID
                created_at: new Date("2024-05-30"),
                updated_at: new Date("2024-05-30"),
              },
              {
                title: "2023 Ford F-150 XLT",
                description:
                  "Powerful and capable pickup truck for work or play. Low mileage and loaded with features.",
                price: 42500.0,
                userId: 1,
                carId: 54321, // Hypothetical car ID
                created_at: new Date("2024-05-29"),
                updated_at: new Date("2024-05-29"),
              },
              {
                title: "2018 Honda Accord EX-L",
                description:
                  "Comfortable and fuel-efficient sedan with a sunroof and leather seats. One owner and meticulously maintained.",
                price: 19800.0,
                userId: 3,
                carId: 67890, // Hypothetical car ID
                created_at: new Date("2024-05-28"),
                updated_at: new Date("2024-05-28"),
              },
              {
                title: "2022 Tesla Model 3 Long Range",
                description:
                  "High-performance electric car with long range and advanced technology. Excellent condition and a joy to drive.",
                price: 56999.0,
                userId: 4,
                carId: 90123, // Hypothetical car ID
                created_at: new Date("2024-05-27"),
                updated_at: new Date("2024-05-27"),
              },
              {
                title: "2019 Jeep Wrangler Rubicon",
                description:
                  "Off-road capable SUV perfect for exploring the outdoors. Lifted suspension and upgraded tires.",
                price: 38500.0,
                userId: 2,
                carId: 34567, // Hypothetical car ID
                created_at: new Date("2024-05-26"),
                updated_at: new Date("2024-05-26"),
              },
              {
                title: "2017 Toyota Camry Hybrid",
                description:
                  "Fuel-efficient and reliable sedan with a spacious interior. Perfect for everyday commutes.",
                price: 16999.0,
                userId: 1,
                carId: 87654, // Hypothetical car ID
                created_at: new Date("2024-05-25"),
                updated_at: new Date("2024-05-25"),
              },
              {
                title: "2022 BMW X3 M",
                description:
                  "High-performance luxury SUV with a powerful engine and luxurious interior. A thrill to drive.",
                price: 68995.0,
                userId: 3,
                carId: 21098, // Hypothetical car ID
                created_at: new Date("2024-05-24"),
                updated_at: new Date("2024-05-24"),
              },
              {
                title: "2021 Nissan Frontier",
                description:
                  "Reliable and capable mid-size pickup truck for work or adventure. Great value for the price.",
                price: 27800.0,
                userId: 4,
                carId: 78901, // Hypothetical car ID
                created_at: new Date("2024-05-23"),
                updated_at: new Date("2024-05-23"),
              }
        
        ]
         
            
    ////////////////////////////..........    
    //Seeder Repository 
    async SeederPostsRepository() {
      console.log("Insertando categorías en la base de datos...");
     return Promise.all(
         this.postsssToPreLoad.map(async (post) =>{
             const newPost = this.postsRepository.create(post)
             if(!newPost){throw new BadRequestException("Error al insertar publicaciones")}
             await this.postsRepository.save(newPost);
             return "Publicaciones insertadas";
         })   
     )
    };

    //Repository: Get All posts
    async getPostsAllRepository() {
      const posts = await this.postsRepository.find();
      if (!posts) throw new NotFoundException('No se encontraron publicaciones');
      return posts;
    }

    //Repository: Get by Id posts
    async getProductsRepositoryId(id: string){
      const postsId = await this.postsRepository.findOneBy({id});
      if(!postsId) {return `publicación con ${id} no encontrado`};

      return postsId;
    }

    async AddPostRepository(posts: CreatePostDto){
      const newPost = await this.postsRepository.save(posts);
      return newPost;
    }





    
    
    //**To search by title or idon not  
    async getProductsByName(title: string): Promise<Posts> {
      return await this.postsRepository.findOneBy({title: title});
   }

}