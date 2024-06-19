"use client"
import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { FaUsers } from 'react-icons/fa';
import { redirect, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { IUserAdm } from '@/interfaces/IUser';

const UserStats: React.FC = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [users, setUsers] = useState<IUserAdm[]>([]);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
  }
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        setUserToken(parsedSession.token);
      } 
    }
  }, [router]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/users`, {
          method: 'GET',
        });
        const data: IUserAdm[] = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Expected an array but received:', data);
          setUsers([]);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <StatCard  title="Usuarios" value={users.length} icon={FaUsers} color="blue" />
  );
}

export default UserStats;
