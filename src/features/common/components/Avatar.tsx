import React from 'react';
import placeholder from '../../../assets/photos/avatar.png';

const Avatar: React.FC<{}> = () => {
    return (
        <div className="w-full h-full rounded-full overflow-hidden">
            <img 
                src={placeholder}
                alt="Avatar"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Avatar;
