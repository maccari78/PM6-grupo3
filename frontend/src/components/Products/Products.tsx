'use client'
import Filters from "../Filters/Filters";
import { mockPosts } from "@/helpers/mockPosts";
import VehiclesComponent from "../VehiclesComponent/VehiclesComponent";
import { useEffect, useState } from "react";

const Products: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  console.log(posts);
  

  useEffect(() => {
     fetch("http://localhost:3001/posts")
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error => console.error('Error fetching posts:', error))
  }, [])

  return (
    <div className="flex flex-col items-center mt-5 justify-around md:items-start  md:flex-row md:justify-evenly md:my-10 md:mx-10 ">
      <Filters />
      <div className="flex justify-center md:w-[70%]  ">
        <VehiclesComponent posts={posts} />
      </div>
    </div>
  );
};

export default Products;
