"use client"
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import { io, Socket } from "socket.io-client";
import { IRentalChat, IUserChat, MessageChat, TMessageChat } from "@/interfaces/Ichat";
import Contact from "@/components/Chat/Contact";
import Message from "@/components/Chat/Message";

const ChatWeb: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<TMessageChat[]>([]);
  const [room_id, setRoom_id] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("");
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [rentalsChats, setRentalsChat] = useState<IRentalChat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sender, setSender] = useState<IUserChat | null>(null);
  const [receiver, setReceiver] = useState<IUserChat | null>(null);
  const [user, setUser] = useState<IUserChat | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiToken = process.env.NEXT_PUBLIC_API_GET_USERS_TOKEN;
  const apiChat = process.env.NEXT_PUBLIC_API_CHAT;

  if (!apiUrl) {
    throw new Error('Environment variable NEXT_PUBLIC_API_GET_USERS_TOKEN is not set');
  }

  const recibeMensaje = (data: TMessageChat) =>
    setMessages((state) => [...state, data]);

  useEffect(() => {
    if (userToken) {
      const newSocket = io(`${apiChat}`, {
        transports: ["websocket"],
        auth: { token: userToken },
      });

      newSocket.on("connect", () => {
        setUserStatus("Conectado");
      });

      newSocket.on("disconnect", () => {
        setUserStatus("Desconectado");
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
    const fetchMessages = async () => {
      if (room_id) {
        try {
          const response = await fetch(`${apiUrl}/chat/${room_id}/messages`);
          const response2 = await fetch(`${apiToken}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Error fetching messages");
          }
          const data: TMessageChat[] = await response.json();
          if (data.length > 0) {
            setSender(data[0].sender as IUserChat);  
            setReceiver(data[0].receiver as IUserChat);  
          }
          const sortedMessages = data.sort((a, b) => new Date(a.date_created || "").getTime() - new Date(b.date_created || "").getTime());
          setMessages(sortedMessages);
          if (response2.ok) { 
            const data2 = await response2.json();
            setUser(data2);
          }
        } catch (error) {
          console.error("Error al obtener los mensajes:", error);
          setError("Error al obtener los mensajes.");
        }
      }
    };

    if (room_id) {
      fetchMessages();
    }
  }, [room_id, apiUrl]);

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
          icon: "error",
        });
        redirect("/login");
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/rentals/token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data: IRentalChat[] = await response.json();
        setRentalsChat(data);
        console.log(data)
        if (data.length > 0) { 
          setRoom_id(data[0].room_id);
        }
      } catch (error: any) {
        console.error(error);
        setError("Error al obtener los datos de alquileres.");
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchData();
    }
  }, [userToken, apiUrl]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sender || !receiver) {
      console.error("No se han establecido el remitente o el receptor.");
      return;
    }
    if(!user) {console.error("No se han establecido el remitente o el receptor.");
      return;
    }

    
    const meMessage: TMessageChat = {
      sender: sender.id === user.id ? sender : user,  
      receiver: receiver.id === user.id ? user : receiver,
      message,
      room_id,
      date_created: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, meMessage]);

    if (socket) {
      socket.emit("posts", meMessage);
    }

    setMessage("");
  };
  const handleRoom = (room_id:string) =>{
    setRoom_id(room_id)
    console.log(room_id)
    }
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-[#313139] text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
        </header>

        {/* Contact List */}
        
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
      {Array.isArray(rentalsChats) && rentalsChats.length > 0 ? (
        rentalsChats.map((rental) => (
          <div key={rental.id}>
            {rental.users.map((userdata, userIndex) => (
              <Contact
                key={userIndex}
                name={userdata.name ?? "Usuario"}
                avatarUrl={userdata.image_url}
                onClick={() => handleRoom(rental.room_id)}
              />
              
            ))}
          </div>
        ))
      ) : (
        <p>No hay mensajes</p>
      )}
    </div>
       
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Chat Header */}
        <header className="bg-gray-300 p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">{ sender?.id !== user?.id ? sender?.name : receiver?.name }</h1>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 bg-gray-400 overflow-y-auto p-4 pb-36">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => {
            const text = `${msg.message ?? 'Mensaje no disponible'}`;
            return (
              <Message
                key={index}
                incoming={msg.sender?.id !== user?.id}
                avatarUrl={ msg.sender?.id === user?.id ? user?.image_url ?? "" : msg.sender?.image_url ?? ""}
                text={text}
              />
            );
          })
        ) : (
          <p>No hay mensajes</p>
        )}
        </div>
        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <input type="text" value={message} onChange={handleChange} placeholder="Escribe un mensaje..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
            <button type="submit" className="bg-[#C4FF0D] text-gray-900 hover:bg-[#dcff73] px-4 py-2 rounded-md ml-2">Enviar</button>
          </div>
          </form>
        </footer>
      </div>
    </div>
  );
};


export default ChatWeb;