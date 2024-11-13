import React from 'react';

/* @ts-ignore */ 
import BaresthoLogo  from "../../../assets/icones/b-barestho.svg?react";
/* @ts-ignore */ 
import Appgrid  from "../../../assets/icones/app-grid.svg?react";
/* @ts-ignore */ 
import Bell  from "../../../assets/icones/notif.svg?react";
import Avatar from '../../common/components/Avatar';

const Navbar: React.FC<{}> = () => {

    const isDesktop = window.innerWidth > 768;

    return (
        <div className="flex flex-row w-full items-center p-3 ">
        {!isDesktop && 
            <BaresthoLogo className="h-8 w-8" />
        }
    
        <div className="flex flex-row items-center space-x-3 ml-auto">
            <Appgrid className="h-8 w-8" />
            <Bell className="h-8 w-8" />
            <div className="mr-2 flex-shrink-0 h-8 w-8">
                <Avatar />
            </div>
        </div>
    </div>
    );
};

export default Navbar;
