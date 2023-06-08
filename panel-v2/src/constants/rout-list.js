import GroupIcon from "@mui/icons-material/Group";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import React from "react";
import CircleIcon from '@mui/icons-material/Circle';


const rout_list = [
    {
        title: 'dashboardMenuItems.users_title',
        icon: <GroupIcon color="primary"/>,
        path: '/users',
        badge: true
    },
    {
        title: 'dashboardMenuItems.role_title',
        icon: <AssignmentIndIcon color="primary"/>,
        path: '/roles',
    },

    {
        title: 'dashboardMenuItems.pages_management',
        key: 'page_management',
        icon: <AssignmentIndIcon color="primary"/>,
        children: [
            {
                title: 'dashboardMenuItems.pages_management_child_1',
                icon: <CircleIcon sx={{fontSize: 12}} color="primary"/>,
                path: '/users',
            },
            {
                title: 'dashboardMenuItems.pages_management_child_2',
                icon: <CircleIcon sx={{fontSize: 12}} color="primary"/>,
                path: '/roles',
            },
        ],
    },
];


export {
    rout_list
}