import React from 'react'
import './Sidebar2.css';
import Sidebar2Row from './Sidebar2Row.js';

function Sidebar2() {
    return (
        <div className="sidebar2">
            <div class="hr" />

            <div class="details">
                <h1>Contacts</h1>
                <i class="searchIcon2" />
                <i class="more" />
            </div>
            <div class="contacts">
                <Sidebar2Row ImageURL="https://scontent.fhyd11-1.fna.fbcdn.net/v/t1.0-1/p148x148/118481251_3275143269198791_1562775451854010190_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=DJ5eF_SWz8gAX_k1CMp&_nc_ht=scontent.fhyd11-1.fna&tp=6&oh=3eb6fe833a57e157b042a857b554baba&oe=5F739318" title="bit" />
                <Sidebar2Row ImageURL="https://scontent.fhyd11-1.fna.fbcdn.net/v/t1.0-1/p148x148/118481251_3275143269198791_1562775451854010190_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=DJ5eF_SWz8gAX_k1CMp&_nc_ht=scontent.fhyd11-1.fna&tp=6&oh=3eb6fe833a57e157b042a857b554baba&oe=5F739318" title="bet" />
                
            </div>
        </div >
    )
}

export default Sidebar2
