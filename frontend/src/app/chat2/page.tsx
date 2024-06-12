"use client";
import { IUserData } from '@/interfaces/IUser';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2';
import { io, Socket } from 'socket.io-client';


interface MessageChat {
  sender?: string;
  receiver?: string;
  message: string;
  room_id?: string;
  image?: string;
  date_created?: Date;
}

const ChatWeb: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageChat[]>([]);
  const [room_id, setRoom_id] = useState<string>(''); 
  const [userStatus, setUserStatus] = useState<string>('');
  const router = useRouter();

  
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (userToken) {
      const newSocket = io('http://localhost:80/chat', {
        transports: ['websocket'],
        auth: { token: userToken }
      });

      newSocket.on('connect', () => {
        setUserStatus('Conectado');
        console.log('Conectado');
      });

      newSocket.on('disconnect', () => {
        setUserStatus('Desconectado');
        console.log('Desconectado');
      });

      newSocket.on(room_id, recibeMensaje); 

      setSocket(newSocket);

      return () => {
        newSocket.off(room_id, recibeMensaje);
        newSocket.close();
      };
    }
  }, [userToken, room_id]);

  useEffect(() => {
    const messageInDb = async () => {
      if (room_id) {
        try {
          const response = await fetch(`http://localhost:3001/chat/${room_id}/messages`);
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error al obtener los mensajes:', error);
        }
      }
    };

    messageInDb();
  }, [room_id]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        setUserToken(parsedSession.token);  
      } else {
        setLoading(true);
        Swal.fire({
          title: "Error de acceso",
          text: "Necesitas estar logueado para ingresar",
          icon: "error"
        });
        redirect("/login");
      }
    }
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const meMessage: MessageChat = {
      sender: 'Me',
      receiver: 'userReceiverState(?)', 
      message,
      room_id,
    };
    setMessages([...messages, meMessage]);
    
    if (socket) {
      socket.emit('mensaje', meMessage);
    }
    
    setMessage('');
  };

  const recibeMensaje = (data: MessageChat) => setMessages((state) => [...state, data]);

  return (
    <div className='bg-gray-700'>
     
      <button onClick={toggleMenu}>
        {menuOpen ? "Cerrar Menú" : "Abrir Menú"}
      </button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} />
        <button type="submit">Enviar</button>
      </form>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.sender}: {msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWeb;