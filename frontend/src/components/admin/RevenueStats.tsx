'use client'
import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { FaDollarSign } from 'react-icons/fa';
import { IPost } from '@/interfaces/Iadmin';

const apiUrl = process.env.NEXT_PUBLIC_API_POSTS;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}

const RevenueStats: React.FC = () => {
  const [carPosts, setCarPosts] = useState<IPost[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
        });
        const data: IPost[] = await response.json();
        
        console.log("Data fetched from API:", data); // Log the data

        if (Array.isArray(data)) {
          setCarPosts(data);

          // Calcula el total de los precios asegurándote de que todos los precios sean válidos
          const total = data.reduce((sum, post) => {
            // Convierte el precio a número si es un string
            const price = typeof post.price === 'string' ? parseFloat(post.price) : post.price;
            return sum + (isNaN(price) ? 0 : price);
          }, 0);
          
          console.log("Total revenue calculated:", total); // Log the total revenue

          setTotalRevenue(total);
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

  // Calcula el 5% del total de los precios
  const percentageRevenue = totalRevenue * 0.05;

  return (
    <StatCard title="Beneficios" value={`$${percentageRevenue.toFixed(2)}`} icon={FaDollarSign} color="green" />
  );
}

export default RevenueStats;
