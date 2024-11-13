import React from 'react';
import { useSelector } from 'react-redux';
import MessageList from '../components/MessagesList';
import { useGetChatQuery } from '../api/ChatAPI';
import { useParams } from 'react-router-dom';

/* @ts-ignore */ 
import BaresthoLogo  from "../../../assets/icones/logo-barestho.svg?react";


const ChatCard: React.FC<{}> = () => {

    

    const id = parseInt(useParams().id as string, 10);
    const { data, error, isLoading } = useGetChatQuery(id);

    const isMobile = useSelector((state: any) => state.mobile.isMobile);


    return ( 
        <div className='flex flex-col w-full h-full bg-primary pb-5'>
        {isMobile && 
            <div className='flex-none p-5'>
                <BaresthoLogo className="h-8 -translate-x-5 " />
            </div>
        }
        {data &&  
            <div className='flex flex-col w-full h-full overflow-y-auto'>
                <MessageList selectedChat={data}></MessageList>
            </div>
        }
    </div>
    
            
    );
};

export default ChatCard;
