import Filters from "../Filters/Filters";
import { mockPosts } from "@/helpers/mockPosts";
import VehiclesComponent from "../VehiclesComponent/VehiclesComponent";

const Products: React.FC = () => {
  return (
    <div className="flex flex-row justify-evenly my-10 mx-10 ">
      <Filters />
      <div className="flex justify-center w-[70%]  ">
        <VehiclesComponent mockPosts={mockPosts} />
      </div>
    </div>
  );
};

export default Products;
