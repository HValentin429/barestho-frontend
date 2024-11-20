import React from 'react';
import ChatList from '../components/ChatList';

import { IChat } from '../interfaces/IChat';
import Navbar from '../../navbar/components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import MessageList from '../components/MessagesList';

const ChatCard: React.FC<{}> = () => {

    const [selectedChat, setSelectedChat] = React.useState<IChat | null>(null);

    const handleCardClick = (chat: IChat) => {
        setSelectedChat(chat);
    };

    const isMobile = useSelector((state: any) => state.mobile.isMobile);


    return ( 
            <div className='flex flex-col w-full h-full'>
                {!isMobile && (<div className="absolute w-[200px] h-full bg-red-500 z-0 mb-4" />)}
                {isMobile ? (
                    <div className='z-10 flex flex-col w-full h-full items-center justify-center pr-3 pl-3 pb-3'>
                        <Navbar />
                        <ChatList handleCardClick={handleCardClick} ></ChatList>
                    </div>
                ) : 
                <div className='z-10 flex flex-row w-full h-full'>
                    <div className='flex flex-col w-4/12 h-full items-center justify-center p-3'>
                     <ChatList handleCardClick={handleCardClick} />
                    </div>
                
                    {selectedChat && (
                     <div className='z-10 flex flex-col w-8/12 h-full p-3'>
                        <div className='flex-shrink-1 align-center'>
                            <Navbar />
                        </div>
                        <div className='z-10 flex flex-col w-full h-full overflow-y-auto'>
                            <MessageList selectedChat={selectedChat} />
                        </div>
                 </div>
                    )}
                </div>
                }
            </div>
            
    );
};

export default ChatCard;
