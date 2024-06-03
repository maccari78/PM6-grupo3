"use client";
import Filters from "../Filters/Filters";
import VehiclesComponent from "../VehiclesComponent/VehiclesComponent";
import { useEffect, useState } from "react";

const Products: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/posts", {
          method: "GET",
        });
        const data = await response.json();
        setPosts(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

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
