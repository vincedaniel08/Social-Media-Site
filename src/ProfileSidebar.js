import React, { useState, useEffect } from 'react'
import './ProfileSidebar.css';
import { db } from './firebase';

function ProfileSidebar({ username }) {
    var [nposts] = useState([])
    const [cuserdata, setCUserdata] = useState()

    useEffect(() => {
        db.collection('posts').onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) =>  { 
              if (doc.data().username === username)  {
                    if (nposts.length !== 9) {
                        if (!nposts.includes(doc.data().imageUrl)) {
                          nposts.push(doc.data().imageUrl) 
                        }
                    }
                }
            } 
            )
        })
    }, )

    useEffect(() => {
        db.collection('users').onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) =>  {
                if (doc.data().displayName === username) {
                    setCUserdata(doc.data())
                   
                }
            })
        })
    }, )

    return (
        <div className="profileSidebar" >
            <div className="posts2">
                <h1>Intro</h1>
                <div className="intro">
                    {
                        cuserdata?.birthday ? (
                            <div className="introblock">
                                <img src="https://image.flaticon.com/icons/png/512/2930/2930910.png" className="birthday" alt="pic" /> 
                                <h1>{`${cuserdata?.birthday[0]} - ${cuserdata?.birthday[1]} - ${cuserdata?.birthday[2]}`}</h1>
                            </div>
                        ) : (
                                console.log()
                            )

                    }
                </div>
            </div>
            <div className="posts2">
                <h1>Photos</h1>
                <div className="photos">
                    {
                        nposts.length === 0 ? (
                            <h1 className="NoNotif">It seems that there are no image posted by this user</h1>
                        ) : (
                                nposts.map((post) => (
                                    <img src={post} alt="pic" />
                                ))
                            )

                    }
                </div>
            
            </div>
           
             </div >
    )
}

export default ProfileSidebar
