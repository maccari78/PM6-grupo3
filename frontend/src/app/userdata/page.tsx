'use client'
import SalePostCard from '@/components/DashboardComponents/PostUser';
import ReviewCard from '@/components/DashboardComponents/ReviewCard';
import Sidebar from '@/components/DashboardComponents/Sidebar'
import { getApiUrl } from '@/helpers/getApiUrl';
import { IUserData } from '@/interfaces/IUser';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const getUsersTokenUrl = getApiUrl('NEXT_PUBLIC_API_GET_USERS_TOKEN')

const UserProfile: React.FC = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserData | null >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        setUserToken(parsedSession.token);  
      } else {
        alert("Necesitas estar logueado para ingresar");
        redirect("/login")
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(getUsersTokenUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error:any) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchData();
    }
  }, [userToken]);
    return (
        <>
        <div className='bg-[#313139] p-6'></div>
        <div className='bg-[#313139]'>

        <Sidebar/>
      <div className="max-w-6xl mx-auto rounded-xl">
        <div className="flex justify-center">
        <img
        src={userData?.image_url}
        alt="Profile"
        className="w-32 h-32 rounded-full"
        />
        </div>
        <div className="text-center mt-2">
          <h2 className="text-lg font-medium text-gray-100">{userData?.name}</h2>
          <p className="text-sm text-gray-300">Buenos Aires, Argentina</p>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-100 text-base">
            {userData?.aboutMe}
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
    
    
    

