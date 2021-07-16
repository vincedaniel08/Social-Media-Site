import React from 'react'
import './css/Sidebar.css';
import SidebarRow from './SidebarRow';
import { Link } from 'react-router-dom'

function Sidebar({ user }) {
   

    return (
        <div className="sidebar">
            <Link to={`/${user.displayName}/${user.uid}`}>
                <SidebarRow avatar ImageLink={user?.photoURL} title={user?.displayName} />
            </Link>
          
            <SidebarRow ImageLink="https://image.flaticon.com/icons/png/512/3362/3362054.png" title="Find Friends" />
            <SidebarRow ImageLink="https://image.flaticon.com/icons/png/512/1256/1256650.png" title="Groups" />
            <SidebarRow ImageLink="https://image.flaticon.com/icons/png/512/3718/3718330.png    " title="Marketplace" />
            <SidebarRow ImageLink="https://image.flaticon.com/icons/png/512/1179/1179069.png" title="Videos" />
            <SidebarRow ImageLink="https://image.flaticon.com/icons/png/512/1636/1636028.png" title="Events" />
            <SidebarRow ImageLink="https://image.flaticon.com/icons/png/512/4268/4268892.png" title="Memories" />
            <SidebarRow ImageLink="https://image.flaticon.com/icons/png/512/4018/4018877.png" title="Saved" />
            <SidebarRow ImageLink="https://image.flaticon.com/icons/png/512/210/210129.png" title="See more" />
            <div class="hr" />
            <div class="policies">
            
                <p>Impulse © 2021</p>
            </div>
        </div>
    )
}

export default Sidebar
