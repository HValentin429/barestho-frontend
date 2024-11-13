import React, { useEffect, useRef, useState } from 'react';
import { useCreateMessageMutation, useGetMessagesQuery } from '../api/MessageAPI';
import { useParams } from 'react-router-dom';
import { IMessage } from '../interfaces/IMessage';
import { IChat } from '../interfaces/IChat';

/* @ts-ignore */ 
import Send  from "../../../assets/icones/send.svg?react";

import bbarestho from "../../../assets/icones/b-barestho.svg";


import Message from './MessageCard';
import { useSelector } from 'react-redux';

const MessageList: React.FC<{ selectedChat: IChat }> = ({ selectedChat }) => {

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatId = selectedChat.id ;
    const [message, setMessage] = useState('');
    const { data: initialMessages, error: initialError, isLoading: isInitialLoading } = useGetMessagesQuery(chatId);
    const [createMessage] = useCreateMessageMutation();
    const [messages, setMessages] = useState<IMessage[]>(initialMessages || []);

    const isRestaurantPath = location.pathname.includes('restaurant');
    const isMobile = useSelector((state: any) => state.mobile.isMobile);
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);


    useEffect(() => {
        const ws = new WebSocket(`ws://host.docker.internal:8080/chat/1/messages/stream`);

        setWebSocket(ws);
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log('Received SSE event:', data);
        }
        ws.onerror = (event) => {
          console.error('WebSocket error:', event);
        }
        return () => {
          ws.close();
        };
      }, [chatId]);


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        setMessage('');
    }, [chatId]);


    useEffect(() => {
        if (initialMessages) {
            setMessages((prevMessages) => [...prevMessages, ...initialMessages]);
        }
    }, [initialMessages]);
    
   
    const handleSendMessage = () => {
        if (message.trim() && chatId !== -1) {
            try {
                const sender = isRestaurantPath ? "restaurant" : "user";
                createMessage({ chatId, message, sender }).unwrap(); 
                setMessage('');
            } catch (err) {
                console.error('Failed to send message:', err);
            }
        } else {
            if (chatId === -1) {
                console.error("Invalid chatId");
            }
        }
    };

    return (
        <div
        className="relative flex flex-col w-full h-full justify-center items-center"
        >

            {!isMobile && <img src={bbarestho} alt="Barestho" className="absolute h-1/2 object-cover opacity-20 z-0"  />}
           

            <div className='z-10 flex flex-col flex-grow w-full min-h-11/12 items-center justify-center pr-3 pl-3 pb-3 overflow-y-scroll'>
                {messages.map((message: IMessage, index) => (
                    <Message key={index} message={message} isRestaurantPath={isRestaurantPath} senderName={isRestaurantPath && message.sender === "restaurant" ? selectedChat?.restaurant : selectedChat?.client} />
                ))}
                <div ref={messagesEndRef} />
            </div>
    
            <div className='z-10 flex w-5/6 h-8 items-center bg-gray-300 rounded-full p-1 pr-0'>
            <input
                type="text"
                placeholder="Ecrire un message..."
                className="w-full text-white bg-transparent text-sm focus:outline-none pl-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); 
                        handleSendMessage();
                    }
                }}
            />
                <div className='flex h-8 w-8 flex-shrink-0 bg-secondary rounded-full justify-center items-center'  >
                    <Send 
                        className='h-6 w-6 flex-shrink-0 bg-secondary rounded-full' 
                        onClick={(e: any) => {
                            e.preventDefault(); 
                            handleSendMessage(); 
                        }} 
                    />
                </div>
            </div>
        </div>
    );
};

export default MessageList;