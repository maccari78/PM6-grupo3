import SalePostCard from '@/components/DashboardComponents/PostUser';
import Sidebar from '@/components/DashboardComponents/Sidebar'
import React from 'react'

const UserProfile: React.FC = () => {
    return (
        <>
        <div className='bg-[#313139] p-6'></div>
        <div className='bg-[#313139]'>

        <Sidebar/>
      <div className="max-w-6xl mx-auto rounded-xl">
        <div className="flex justify-center">
        <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt="Profile"
        className="w-32 h-32 rounded-full"
        />
        </div>
        <div className="text-center mt-2">
          <h2 className="text-lg font-medium text-gray-100">Luis Perez</h2>
          <p className="text-sm text-gray-300">Buenos Aires, Argentina</p>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-100 text-base">
            An artist of considerable range, Mike is the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and
            records all of his own music, giving it a warm.
          </p>
        </div>
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium text-gray-100">Reviews</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ReviewCard
              rating="★★★★☆"
              text="Great work on the project!"
              />
            <ReviewCard
              rating="★★★★★"
              text="Excellent collaboration and communication."
              />
            <ReviewCard
              rating="★★★☆☆"
              text="Good effort, but room for improvement."
              />
          </div>
        </div>
        <div className="px-6 py-4">
        <h3 className="text-lg font-medium text-gray-100">Sale Posts</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SalePostCard
            productName="Product 1"
            productDescription="This is a great product that you will love."
            price="$100"
            imageUrl="https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/pickups-and-trucks/pickups-and-trucks-subcontent/01-images/noviembre-20/cab-dupla.jpg?imwidth=960"
            />
          <SalePostCard
            productName="Product 2"
            productDescription="This product is a must-have for everyone."
            price="$200"
            imageUrl="https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/pickups-and-trucks/pickups-and-trucks-subcontent/01-images/noviembre-20/cab-dupla.jpg?imwidth=960"
            />
          <SalePostCard
            productName="Product 3"
            productDescription="An amazing product at a great price."
            price="$150"
            imageUrl="https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/pickups-and-trucks/pickups-and-trucks-subcontent/01-images/noviembre-20/cab-dupla.jpg?imwidth=960"
            />
        </div>
      </div>
      </div>
            </div>
      </>
    );
  };
  
  export default UserProfile;
    
    interface ReviewCardProps {
        rating: string;
        text: string;
      }
      
      const ReviewCard: React.FC<ReviewCardProps> = ({ rating, text }) => (
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <div className="flex items-center">
            <span className="text-yellow-500">{rating}</span>
            <span className="ml-2 text-sm text-gray-100">{text}</span>
          </div>
        </div>
      );
    
    

