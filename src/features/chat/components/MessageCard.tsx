import React from 'react';
import { IMessage } from '../interfaces/IMessage';
import Avatar from '../../common/components/Avatar';

const Message: React.FC<{ message: IMessage, isRestaurantPath: boolean, senderName?: string }> = ({ message, isRestaurantPath, senderName }) => {
    const isOtherParty = (isRestaurantPath && message.sender !== "restaurant") || (!isRestaurantPath && message.sender === "restaurant");

    return isOtherParty ? (
        <div className="flex flex-col w-full h-full justify-start pr-3 pl-3 pb-3">
           <span className="text-xs text-gray-500 ml-[55px] mb-1">{senderName}</span>
            <div className='flex flex-row'>
                <div className="w-12 h-12 flex-shrink-0">
                    <Avatar />
                </div>
                <div className="min-w-2/6 flex text-sm self-center p-3 bg-secondary text-white rounded-br-2xl rounded-tr-2xl rounded-tl-2xl ml-2">
                    <span className="text-sm">{message.message}</span>
                </div>
            </div>
           
        </div>
    ) : (
    <div className="flex flex-col w-full h-full items-end justify-end pr-3 pl-3 pb-3 bg-">
            <div className='flex flex-row justify-end'>
                <div className="min-w-2/6 flex text-sm self-center p-2 bg-gray-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl mr-2  ">
                    <span className="text-sm">{message.message}</span>
                </div>
                
                <div className="w-12 h-12 flex-shrink-0">
                    <Avatar />
                </div>
            </div>
    </div>
    );
};

export default Message;
