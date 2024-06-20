'use client'
import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { FaShoppingCart } from 'react-icons/fa';
import { IPost } from '@/interfaces/Iadmin';

const apiUrl = process.env.NEXT_PUBLIC_API_POSTS;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}
const OrderStats: React.FC = () => {
  const [carPosts, setCarPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
        });
        const data: IPost[] = await response.json();
        if (Array.isArray(data)) {
          setCarPosts(data);
        } else {
          console.error('Expected an array but received:', data);
          setCarPosts([]);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <StatCard title="Publicaciones" value={carPosts.length} icon={FaShoppingCart} color="purple" />
  );
}

export default OrderStats;
