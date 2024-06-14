import VehicleCard from "../VehicleCard/VehicleCard";
import { IPost } from "./interfaces/IPost";

const VehiclesComponent: React.FC<{ nPosts: IPost[] }> = ({ nPosts }) => {
  return (
    <div className="flex justify-evenly  flex-wrap">
      {nPosts?.map((post: IPost) => {
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
            carAvailability={post.car.availability}
          />
        );
      })}
    </div>
  );
};

export default VehiclesComponent;
