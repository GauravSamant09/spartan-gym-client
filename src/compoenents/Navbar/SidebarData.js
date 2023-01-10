import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Payment',
        path: '/payments',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    }
    ,
    {
        title: 'Member',
        path: '/members',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    }

];