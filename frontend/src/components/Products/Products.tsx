import Filters from "../Filters/Filters";
import { mockPosts } from "@/helpers/mockPosts";
import VehiclesComponent from "../VehiclesComponent/VehiclesComponent";

const Products: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-5 justify-around md:items-start  md:flex-row md:justify-evenly md:my-10 md:mx-10 ">
      <Filters />
      <div className="flex justify-center md:w-[70%]  ">
        <VehiclesComponent mockPosts={mockPosts} />
      </div>
    </div>
  );
};

export default Products;
