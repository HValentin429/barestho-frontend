import React from 'react';

/* @ts-ignore */ 
import BaresthoLogo  from "../../../assets/icones/b-barestho.svg?react";
/* @ts-ignore */ 
import Appgrid  from "../../../assets/icones/app-grid.svg?react";
/* @ts-ignore */ 
import Bell  from "../../../assets/icones/notif.svg?react";
import Avatar from '../../common/components/Avatar';
import NotificationComponent from '../../notification/components/NotificationComponent';
import { useSelector } from 'react-redux';

const Navbar: React.FC<{}> = () => {

    const isMobile = useSelector((state: any) => state.mobile.isMobile);

    return (
        <div className="flex flex-row w-full items-center p-3 ">
        {isMobile && 
            <BaresthoLogo className="h-8 w-8" />
        }
    
        <div className="flex flex-row items-center space-x-3 ml-auto">
            <Appgrid className="h-8 w-8" />
            <NotificationComponent />
            <div className="mr-2 flex-shrink-0 h-8 w-8">
                <Avatar />
            </div>
        </div>
    </div>
    );
};

export default Navbar;
