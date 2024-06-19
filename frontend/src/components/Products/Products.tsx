"use client";
import Filters from "../Filters/Filters";
import VehiclesComponent from "../VehiclesComponent/VehiclesComponent";
import { useEffect, useState } from "react";
import { IPost } from "../VehiclesComponent/interfaces/IPost";
import ShowAndDeleteFilter from "../ShowAndDeleteFilter/ShowAndDeleteFilter";
import Pagination from "../Pagination/Pagination";
import SearchComponent from "../Navbar/SearchBar";

const apiUrl = process.env.NEXT_PUBLIC_API_POSTS;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!apiBaseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_URL is not set");
}

const Products: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postsQT, setPostQT] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<any | null>(null);
  const [notShowFilter, setNotShowFilter] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
      });
      const data: IPost[] = await response.json();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error("Se espera un array pero se recibio", data);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters);
      const queryString = queryParams.toString().replace(/\+/g, "%20");
      const response = await fetch(
        `${apiBaseUrl}/posts/filter?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }

      const data: IPost[] = await response.json();
      if (Array.isArray(data)) {
        setPosts(data);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filters) {
      fetchFilters();
    } else {
      fetchPosts();
    }
  }, [filters]);

  const handleSearch = (searchPosts: IPost[]) => {
    setFilters(null)

    setTimeout(() => {
      setPosts(searchPosts);
    }, 260);
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const deleteFilter = () => {
    setFilters(null);
    setNotShowFilter(false);
    setNotFound(false);
  };

  const endIndex = currentPage * postsQT;
  const intIndex = endIndex - postsQT;

  const nPosts: IPost[] = Array.isArray(posts)
    ? posts.slice(intIndex, endIndex)
    : [];

  const nPages: number = Math.ceil(posts.length / postsQT);

  return (
    <div>
      <SearchComponent onSearch={handleSearch}/>

    <div className="flex flex-col   items-center mt-5 justify-around md:items-start  md:flex-row md:justify-evenly md:my-10 md:mx-10 ">
      <Filters onFilterChange={handleFilterChange} />
      <div className="flex flex-col justify-center md:w-[70%]">
        {filters && (
          <ShowAndDeleteFilter deleteFilter={deleteFilter} filters={filters} />
        )}

        {loading ? (
          <div className="flex flex-row items-center">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin fill-[#C4FF0D]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
            <h1 className="ml-5 md:text-xl">Cargando, espere....</h1>
          </div>
        ) : notFound ? (
          <div className="flex flex-col gap-4 items-center justify-center h-full">
            <div className="w-[40%]">
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjhwb21iNnE1b3BpdWM2Zjl4NHd2MzlneXgyM2ZyOHVsN3ptNTFycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MSU9sITGoHWMGGVn9n/giphy.webp"
                alt="404 gif"
                className="rounded-xl w-full"
              />
            </div>
            <h1 className="md:text-3xl text-gray-100">
              ¡No se encontraron resultados!
            </h1>
            <h1 className="text-sm md:text-lg text-[#C4FF0D]">
              ¡Lo sentimos, no encontramos lo que buscas!
            </h1>
          </div>
        ) : (
          <>
            <VehiclesComponent nPosts={nPosts} />
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              nPages={nPages}
            />
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default Products;
