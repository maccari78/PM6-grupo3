import VehicleCard from "../VehicleCard/VehicleCard";
import { IPost } from "./interfaces/IPost";

const VehiclesComponent: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <div className="flex justify-evenly  flex-wrap">
      {posts.map((post: IPost) => {
        return (
          <VehicleCard
            key={post.id}
            id={post.id}
            description={post.description}
            carId={post.car.id}
            carImg={post.car.image_url}
            carBrand={post.car.brand}
            carModel={post.car.model}
            carYear={post.car.year}
            carMileage={post.car.mileage}
            carPrice={post.price}
          />
        );
      })}
    </div>
  );
};

export default VehiclesComponent;
