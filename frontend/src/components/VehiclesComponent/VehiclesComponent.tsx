import VehicleCard from "../VehicleCard/VehicleCard";
import { IPost } from "./interfaces/IPost";

const VehiclesComponent: React.FC<{ mockPosts: IPost[] }> = ({ mockPosts }) => {
  return (
    <div className="flex justify-evenly  flex-wrap">
      {mockPosts.map((post: IPost) => {
        return (
          <VehicleCard
            key={post.id}
            id={post.id}
            description={post.description}
            carId={post.cars_id.id}
            carImg={post.cars_id.image_url}
            carBrand={post.cars_id.brand}
            carModel={post.cars_id.model}
            carYear={post.cars_id.year}
            carMileage={post.cars_id.mileage}
            carPrice={post.cars_id.price}
          />
        );
      })}
    </div>
  );
};

export default VehiclesComponent;
