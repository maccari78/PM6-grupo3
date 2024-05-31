import { Repository } from "typeorm";
import {Posts } from "./entities/post.entity";
// import postsssToPreLoad from "./preloadPosts"
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { Car } from "src/cars/entities/car.entity";
import * as data from "./data.json"
// import { FileUploadService } from "src/file-upload/file-upload.service";



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
        @InjectRepository(Posts) 
        private readonly postsRepository: Repository<Posts>,
        // private readonly fileUploadService: FileUploadService
      ) {}
        
        public postsssToPreLoad = [
            {
                title: "2020 Toyota Highlander",
                description:
                  "Spacious and reliable SUV with plenty of room for passengers and cargo. Well-maintained and in excellent condition.",
                price: 29995.0,
                // userId: 2,
                // carId: 12345, // Hypothetical car ID
                created_at: new Date("2024-05-30"),
                updated_at: new Date("2024-05-30"),
                // user:"e679b4a9-22e9-49eb-945f-8b600694762a"
              },
              {
                title: "2023 Ford F-150 XLT",
                description:
                  "Powerful and capable pickup truck for work or play. Low mileage and loaded with features.",
                price: 42500.0,
                // userId: 1,
                // carId: 54321, // Hypothetical car ID
                created_at: new Date("2024-05-29"),
                updated_at: new Date("2024-05-29"),
                // user:"e679b4a9-22e9-49eb-945f-8b600694762c"

              },
              {
                title: "2018 Honda Accord EX-L",
                description:
                  "Comfortable and fuel-efficient sedan with a sunroof and leather seats. One owner and meticulously maintained.",
                price: 19800.0,
                // userId: 3,
                // carId: 67890, // Hypothetical car ID
                created_at: new Date("2024-05-28"),
                updated_at: new Date("2024-05-28"),
                // user:"e679b4a9-22e9-49eb-945f-8b600694762d"

              },
              {
                title: "2022 Tesla Model 3 Long Range",
                description:
                  "High-performance electric car with long range and advanced technology. Excellent condition and a joy to drive.",
                price: 56999.0,
                // userId: 4,
                // carId: 90123, // Hypothetical car ID
                created_at: new Date("2024-05-27"),
                updated_at: new Date("2024-05-27"),
                // user:"e679b4a9-22e9-49eb-945f-8b600694762z"

              },
              {
                title: "2019 Jeep Wrangler Rubicon",
                description:
                  "Off-road capable SUV perfect for exploring the outdoors. Lifted suspension and upgraded tires.",
                price: 38500.0,
                // userId: 2,
                // carId: 34567, // Hypothetical car ID
                created_at: new Date("2024-05-26"),
                updated_at: new Date("2024-05-26"),
                // user:"e679b4a9-22e9-49eb-945f-8b600694762x"

              },
              {
                title: "2017 Toyota Camry Hybrid",
                description:
                  "Fuel-efficient and reliable sedan with a spacious interior. Perfect for everyday commutes.",
                price: 16999.0,
                // userId: 1,
                // carId: 87654, // Hypothetical car ID
                created_at: new Date("2024-05-25"),
                updated_at: new Date("2024-05-25"),
                // user:"e679b4a9-22e9-49eb-945f-8b600694762n"
              },
              {
                title: "2022 BMW X3 M",
                description:
                  "High-performance luxury SUV with a powerful engine and luxurious interior. A thrill to drive.",
                price: 68995.0,
                // userId: 3,
                // carId: 21098, // Hypothetical car ID
                created_at: new Date("2024-05-24"),
                updated_at: new Date("2024-05-24"),
                // user:"e679b4a9-22e9-49eb-945f-8b600694762m"

              },
              {
                title: "2021 Nissan Frontier",
                description:
                  "Reliable and capable mid-size pickup truck for work or adventure. Great value for the price.",
                price: 27800.0,
                // userId: 4,
                // carId: 78901, // Hypothetical car ID
                created_at: new Date("2024-05-23"),
                updated_at: new Date("2024-05-23"),
                // user:"e679b4a9-22e9-49eb-945f-8b600694762p"

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
            // return await this.postsRepository.save(newPost);
         })   
     )
    };

    ////////////////////////////..........    
    //Seeder Repository 
    // async SeederPostsRepository() {
    //   data?.map(async(Element) =>{
        
    //     const newPosts = new Posts();
    //     newPosts.title = Element.title;
    //     newPosts.description = Element.description;
    //     newPosts.price = Element.price;


    //     await this.postsRepository
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Posts)
    //     .values(newPosts)
    //     //If product exists, update it
    //     .orUpdate(
    //         ["description", "price","userId","carId",""],["title"],
    //     )
    //     .execute();
    //   });
    //   return "Products aggregated"

    // };





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

    //.......................//
    //Repository: Add Posts  //
    // async CreatePostsRepository(post: CreatePostDto, file?: Express.Multer.File){
    //   const { title, description, price } = post;

    //   let imageUrl;
    //   if (file) {
    //     imageUrl = await this.fileUploadService.uploadProfilePicture(file, post.userId); // Use uploadProfilePicture
    //   }
  
    //   const newPost = {
    //     title,
    //     description,
    //     price,
    //     imageUrl,
    //     /* other post properties */
    //   };
  
    //   return await this.postsRepository.AddProductsRepository(newPost);
    // }
  
  





    //.......................//
    //Repository: Update posts
    async UpdatePostsRepository(id: string, posts: Partial<Posts>){
        const updatePost = await this.postsRepository.findOneBy({id});
        // if(!updateProduct) throw new NotAcceptableException( `Not found product with id ${id}`);

        if(!updatePost)throw new NotFoundException( `No se encontro publicación con ${id}`) 

        try {await this.postsRepository.update(id,posts);
        } catch (error) {throw new NotFoundException('No se puede actualizar publicación porque UUID is invalido');}

        // return updatePost

        // Obtener el post actualizado
        const newupdatedPost = await this.postsRepository.findOne({ where: { id } });
        if (!newupdatedPost) throw new NotFoundException(`No se pudo obtener la publicación actualizada con ${id}`);

        return newupdatedPost;
    }

    //Repository: Delete Posts
    async DeletePostsRepository(id: string){
        const postsFind = await this.postsRepository.findOne({where : {id}});
        if(!postsFind)throw new NotFoundException( `No se pudo obtener la publicación con ${id}`) 
        
            try {await this.postsRepository.remove(postsFind);
        } catch (error) {throw new ConflictException('No se puede eliminar publicación porque UUID is invalido');}
    
        // await this.productsRepositorynew.delete(productFind);
        return postsFind
    }



    
    
    //**To search by title or idon not  
    async getProductsByName(title: string): Promise<Posts> {
      return await this.postsRepository.findOneBy({title: title});
   }

}