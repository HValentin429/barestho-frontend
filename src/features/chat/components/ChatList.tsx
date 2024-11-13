import React, { useState, useEffect } from 'react';
import { IChat } from '../interfaces/IChat';
import { useGetChatsQuery } from '../api/ChatAPI';
import ChatCard from './ChatCard';

/* @ts-ignore */ 
import SearchIcon  from "../../../assets/icones/search.svg?react";

/* @ts-ignore */ 
import BaresthoLogo  from "../../../assets/icones/logo-barestho.svg?react";

import { useSelector } from 'react-redux';


const ChatList: React.FC<{ handleCardClick: any }> = ({ handleCardClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useGetChatsQuery({ search: searchTerm });
 
  const isMobile = useSelector((state: any) => state.mobile.isMobile);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => setSearchTerm(e.target.value), 500);
  };

  return (
    <div className="flex flex-col items-center w-full h-full flex-grow-1 rounded-lg p-3 bg-primary bg-gray-800">
  
      {!isMobile &&     
        <div className='w-full pb-2'>
          <BaresthoLogo className="h-7 -translate-x-10" />
        </div>
      }
       
      <div className='w-full flex items-center bg-gray-600 rounded-md p-1'>
        <SearchIcon/> 
        <input
          type="text"
          placeholder="Search chats..."
          onChange={handleSearchChange}
          className=' w-full text-white bg-gray-600 text-sm focus:outline-none'
        >
          
        </input>
      </div>
     
      <div className="flex flex-col items-center w-full">
        {isLoading && <p>Loading chats...</p>}
        {error && <p>Error loading chats.</p>}
        {data?.map((chat: IChat) => (
             <ChatCard key={chat.id} chat={chat} handleCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
