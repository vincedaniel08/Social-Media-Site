import React, { useEffect, useState } from "react";
import "./css/HomeHeader.css";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { auth, db } from './utils/firebase';
import { useStateValue } from './StateProvider';



function Header({ user, selected }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDown, setProfileDown] = useState(false);
  const history = useHistory("");
  const [{ notifications }, dispatch] = useStateValue();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      snapshot.docs.forEach( (doc)=> {
        if (doc.data().username === user.displayName) {
          db.collection('posts').doc(doc.id).collection('comments').onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc)=> {
            //  console.log(doc.data())
              if (doc.data().username !== user.displayName) {
                dispatch({
                  type: 'ADD_TO_NOTIFICATIONS',
                  item: {
                    notification: doc.data(),
                  },
                });
              }
            });
          })
        }
      });

    });
  }, [user,dispatch])

  if (user === false) {
    history.push("/login");
  }

  const logout = () => {
    if (user) {
    
     auth.signOut().then(() => {
        // Sign-out successful.
        history.push("/login");
      }).catch((error) => {
        // An error happened.
      });
     
    }
  }


  const renderNotifications = () => {
    if (notificationsOpen) {
      setNotificationsOpen(false)
      document.getElementsByClassName('dropdown-content2')[0].classList.remove('block')
    } else {
      setNotificationsOpen(true)
      setProfileDown(false)
      document.getElementsByClassName('dropdown-content')[0].classList.remove('block');
      document.getElementsByClassName('dropdown-content2')[0].classList.add('block');
    }
  }

  const renderProfile = () => {
    if (profileDown) {
      setProfileDown(false)
      document.getElementsByClassName('dropdown-content')[0].classList.remove('block');
    } else {
      setProfileDown(true);
      setNotificationsOpen(false)
      document.getElementsByClassName('dropdown-content2')[0].classList.remove('block');
      document.getElementsByClassName('dropdown-content')[0].classList.add('block');
    }
  }

  const collapseNavbar = () => {
    document.getElementsByClassName('homeHeader__logo')[0].style.display = 'block';
    document.getElementsByClassName('homeHeader__searchBack')[0].style.display = 'none';
    document.getElementsByClassName('searchBox')[0].style.display = 'none';
    document.getElementsByClassName('homeHeader__search')[0].style.display = 'block';
    document.getElementsByClassName('dropdown-content3')[0].style.display = 'none';
    document.getElementsByClassName('searchBox')[0].value = ""
  }

  const expandNavbar = () => {
    document.getElementsByClassName('homeHeader__logo')[0].style.display = 'none';
    document.getElementsByClassName('homeHeader__searchBack')[0].style.display = 'block';
    document.getElementsByClassName('homeHeader__search')[0].style.display = 'none';
    document.getElementsByClassName('searchBox')[0].style.display = 'block';
  }

  useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()))
    })

    if (users !== undefined) {
      const finalUsers = users.filter(user => {
        return user.displayName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      })

      setFilteredUsers(finalUsers)
    }
  },[users,searchTerm])

  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value)
    document.getElementsByClassName('dropdown-content3')[0].style.display = 'block';
  }


  return (
    <div class="homeHeader">
      <div class="homeHeaderLogoAndSearch">
        <Link to="/">
          <img src="https://dcassetcdn.com/design_img/1991661/580863/580863_10613380_1991661_5aab9ee1_image.jpg" class="homeHeader__logo" alt="header pic"/>
        </Link>
        <div class="homeHeader__searchBack" onClick={collapseNavbar}>
          <i class="searchBackIcon" />
        </div>
        <div class="homeHeader__search" onClick={expandNavbar}>
          <i class="searchIcon" />
        </div>
        <input type="text" className="searchBox" placeholder="Search Impulse" onChange={updateSearchResults} />
        <div class="dropdown-content3">
          <ul id="list">
            {
              users !== undefined && (
                filteredUsers.map((user1) => (
                  <li>
                    <a onClick={collapseNavbar} href={`/${user1?.displayName}/${user1?.uid}`}>
                      <Avatar className="searchAvatar" src={user1.photoURL} />  
                      <h3 className="searchH3">{user1.displayName}</h3>
                    </a>
                  </li>
                ))
              )
            }
          </ul>
        </div>
      </div>
 

      <div class="homeHeader__otherIcons">
        <div class="round profile">
          <a href={`/${user?.displayName}/${user.uid}`}>
            <Avatar className="ProfileAvatar" src={user.photoURL} />
            <p>{user.displayName}</p>
          </a>
        </div>
        <div >
         
        </div>

        <div class="round">
        <img src="https://img.icons8.com/material/22/ffffff/chat--v1.png" className="messengerIcon"  alt="pic"/>
        </div>

        <div class="round" onClick={renderNotifications}>
          <svg viewBox="0 0 28 28" alt="" class={`notificationsIcon ${notificationsOpen && "blue"}`} height="20" width="20"><path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path></svg>
        </div>
        <div class="dropdown-content2">
          <h1>Notifications</h1>

          {
            notifications.length === 0 ? (
              <div className="noNotifDiv">
                <img src={"https://image.flaticon.com/icons/png/512/3918/3918207.png"} alt="user pic"/>
                <h1 className="NoNotif">It seems that there are no active notifications</h1>
              </div>
            ) : (
                console.log()
              )
          }
          {
            notifications.map(({ notification }) => (
              <a href="/" className="announcement"  >
              <div class="optionDrop">
                <Avatar src="" />
                <div className="announcementInfo">
                  <h1>{notification.username} <span>commented to your post.</span></h1>
                </div>
              </div>
            </a>
            ))
          }

        </div>
        <div class="round" onClick={renderProfile}>
          <i class={`dropdownIcon ${profileDown === true && "blue"}`} />
          <div class="dropdown-content">
            <a href={`/${user?.displayName}/${user.uid}`}>
              <div class="optionDrop">
                <img src={user.photoURL} class="Avatar" alt="user pic" />
                <div class="sideinfoDropAvatar" >
                  <h1>{user?.displayName}</h1>
                  <p>See your profile</p>
                </div>
              </div>
            </a>
            <div class="hr" />
         
            
            <a href={logout}>
              <div onClick={logout} class="optionDrop">
                <div class="iconDrop">
                  <i class="logout" />
                </div>
                <h1>Log out</h1>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Header;