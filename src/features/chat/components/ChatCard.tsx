import React from 'react';
import { IChat } from '../interfaces/IChat';
import Avatar from '../../common/components/Avatar';

const ChatCard: React.FC<{ chat: IChat, handleCardClick: any }> = ({ chat,handleCardClick }) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    return isToday
        ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Show time if today
        : date.toLocaleDateString([], { month: 'short', day: 'numeric' });    // Show date if not today
};

  const formattedDateOrTime = chat.last_message?.created_at
    ? formatDateTime(chat.last_message.created_at)
    : '';

  const truncatedMessage = chat.last_message?.message.length > 50
  ? chat.last_message.message.slice(0, 50) + '...'
  : chat.last_message?.message;

    return (
        <div className="flex flex-row items-center p-2 text-white w-full" onClick={() => handleCardClick(chat)} key={chat.id}>
          <div className="w-12 h-12 mr-2 flex-shrink-0">
            <Avatar />
          </div>
          
          <div className="flex flex-col w-full">
            <div className="flex justify-between self-start w-full">
              <span className="flex text-sm font-semibold">{chat.client}</span>
              <span className="flex text-sm text-gray-400">{formattedDateOrTime}</span>
            </div>
            <span className="text-xs text-gray-400 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-400 after:absolute after:bottom-0 after:left-0 after:translate-y-2">
              {truncatedMessage || '‏‏‎ ‎'}
            </span>
          </div>
        </div>
      );
};

export default ChatCard;
