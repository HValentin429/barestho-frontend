import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateMessageMutation, useGetMessagesQuery } from '../api/MessageAPI';
import { addMessage, removeAll, setConnectionStatus } from '../api/MessageSlice';
import { IMessage } from '../interfaces/IMessage';
import { IChat } from '../interfaces/IChat';

/* @ts-ignore */ 
import Send  from "../../../assets/icones/send.svg?react";
/* @ts-ignore */ 
import Attachment  from "../../../assets/icones/attachment.svg?react";
/* @ts-ignore */ 
import AudioMessage  from "../../../assets/icones/microphone.svg?react";
import bbarestho from "../../../assets/icones/b-barestho.svg";

import Message from './MessageCard';
import { removeNotification } from '../../notification/api/NotificationSlice';
import { INotification } from '../../notification/interfaces/INotification';

const MessageList: React.FC<{ selectedChat: IChat }> = ({ selectedChat }) => {

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatId = selectedChat.id;
    const [message, setMessage] = useState('');
    const { data: initialMessages, error: initialError, isLoading: isInitialLoading } = useGetMessagesQuery(chatId);
    const [createMessage] = useCreateMessageMutation();

    const messages = useSelector((state: any) => state.messages.messages); 
    const isRestaurantPath = location.pathname.includes('restaurant');
    const isMobile = useSelector((state: any) => state.mobile.isMobile);
    const notifications = useSelector((state: any) => state.notifications.notifications);


    const dispatch = useDispatch();

    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
      const websocket = new WebSocket(`ws://localhost:8000/ws/chat/${chatId}/messages/stream`);
      setWs(websocket);
      
      websocket.onopen = () => {
        dispatch(setConnectionStatus(true)); 
        console.log('WebSocket connected');
      };
  
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(addMessage(data.message)); 
      };
  
      websocket.onerror = (event) => {
        console.error('WebSocket error:', event);
      };
  
      websocket.onclose = () => {
        dispatch(setConnectionStatus(false)); 
        console.log('WebSocket closed');
      };
  
      return () => {
        if (websocket) {
          websocket.close();
        }
      };
    }, [chatId, dispatch]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        setMessage('');
        dispatch(removeAll());
        const notification = notifications.find((notification: INotification) => notification.origin === chatId.toString());

        if (notification) {
            dispatch(removeNotification(notification.id)); 
        }

        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatId]);



    useEffect(() => {
        if (initialMessages) {
            initialMessages.forEach((msg: IMessage) => {
                dispatch(addMessage(msg));
            });
        }
    }, [initialMessages, dispatch]);

    const handleSendMessage = () => {
        if (message.trim() && chatId !== -1) {
            try {
                const sender = isRestaurantPath ? "restaurant" : "user";
                let messageSend = { chat: chatId, message: message, sender: sender };

                if (ws) {
                    ws.send(JSON.stringify(messageSend));
                } else {
                    createMessage({ chatId, message, sender }).unwrap();
                }

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
        <div className='z-10 flex flex-col flex-grow w-full h-11/12 items-center  pr-3 pl-3 pb-3 overflow-y-auto'>

            {!isMobile && <img src={bbarestho} alt="Barestho" className="absolute h-1/2 object-cover opacity-20 z-0" />}

            <div className='z-10 flex flex-col-reverse flex-grow w-full min-h-11/12 items-center pr-3 pl-3 pb-3 overflow-y-scroll'>
                <div ref={messagesEndRef} />
                {messages.toReversed().map((message: IMessage, index: number) => (
                    <Message key={index} message={message} isRestaurantPath={isRestaurantPath} senderName={isRestaurantPath && message.sender === "restaurant" ? selectedChat?.restaurant : selectedChat?.client} />
                ))}
             
            </div>
    
            <div  className={`z-10 flex w-9/12 h-8 items-center rounded-full p-1 pr-0 ${
                        isMobile ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                <Attachment
                    className={`h-5 w-5 flex-shrink-0 rounded-full ${
                        isMobile ? 'text-gray-200' : 'text-gray-600'
                    }`}
                />
                <input
                    type="text"
                    placeholder="Ecrire un message..."
                    className={`w-full bg-transparent text-sm focus:outline-none pl-2 ${
                        isMobile ? 'text-gray-200' : 'text-gray-600'
                    }`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); 
                            handleSendMessage();
                        }
                    }}
                />
                <div className='flex flex-row justify-end items-center gap-3'>
                    <AudioMessage
                        className={`h-5 w-5 flex-shrink-0 rounded-full ${
                            isMobile ? 'text-gray-200' : 'text-gray-600'
                        }`}
                    />
                    <div className='flex h-8 w-8 flex-shrink-0 bg-secondary rounded-full justify-center items-center'>
                        <Send 
                            className='h-5 w-5 flex-shrink-0 bg-secondary rounded-full' 
                            onClick={(e: any) => {
                                e.preventDefault(); 
                                handleSendMessage(); 
                            }} 
                        />
                    </div>
                </div>
              
            </div>
        </div>
    );
};

export default MessageList;
