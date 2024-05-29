import { PostEntity } from "./entities/post.entity";


export class PostsRepository {
    constructor(private readonly postsService: PostEntity) {}

    async getPostsRepository() {

        return await "probando repositorio";
    }
}