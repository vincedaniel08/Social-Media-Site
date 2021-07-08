import React, { useState, useEffect } from 'react'
import './Post.css';
import { Avatar } from '@material-ui/core';
import {  db } from './firebase';
import firebase from "firebase";
import like2 from "./images/like2.png"

function Post({ postId, user, username, caption, imageUrl, noLikes, postUserId }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState('like2');
    const [show2, setShow2] = useState('textforlike');
    const [posterImage, setPosterImage] = useState('')
  
    const [postUser, setPostUser] = useState();
   
    useEffect(() => {
        if(postUserId) {
            db.collection('users').doc(postUserId).onSnapshot((snapshot) => {
                setPostUser(snapshot.data())
            })
        }

        console.log(postUserId)
    }, [postUserId])

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    useEffect((show) => {

    db.collection("posts")
            .doc(postId)
            .collection("likes")
            .doc(user.uid)
            .get()
            .then(doc2 => {
                if (doc2.data()) {
                    if (show === 'like2') {
                        setShow('like2 blue');
                        setShow2('textforlike bluetextforlike');
                 
                        
                       
                    } else {
                        setShow('like2');
                        setShow2('textforlike')
                        
                    }
               
                } 
            })
    },[postId, user.uid]);

    const likeHandle = (event) => {
        event.preventDefault();
        if (show === 'like2') {
            setShow('like2 blue');
            setShow2('textforlike bluetextforlike')
        } else {
            setShow('like2');
            setShow2('textforlike')
        }

        db.collection('posts')
            .doc(postId)
            .get()
            .then(docc => {
                const data = docc.data()
                console.log(show)
                if (show === 'like2') {
                    db.collection("posts")
                        .doc(postId)
                        .collection("likes")
                        .doc(user.uid)
                        .get()
                        .then(doc2 => {
                            if (doc2.data()) {
                                console.log(doc2.data())
                            } else {
                                db.collection("posts").doc(postId).collection("likes").doc(user.uid).set({
                                    likes: 1
                                });
                                db.collection('posts').doc(postId).update({
                                    noLikes: data.noLikes + 1
                                });
                            }
                        })

                } else {
                    db.collection('posts').doc(postId).collection('likes').doc(user.uid).delete().then(function () {
                        db.collection('posts').doc(postId).update({
                            noLikes: data.noLikes - 1
                        });
                    })
                }
            })

    }


    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user?.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: user?.photoURL
        });
        setComment('');
    }

    useEffect(() => {
        if(postUserId) {
            db.collection('users').doc(postUserId).onSnapshot((snapshot) => {
                setPosterImage(snapshot.data().photoURL)
              
            })
        }
    }, )
    

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt=""
                    src={posterImage !== '' && posterImage}
                />
                <h3 onClick={() => {
                    window.location.href=  `/${username}/${postUser?.uid}`
                }} style={{cursor: 'pointer'}}>{username}</h3>
                <i class="post__verified" />
            </div>

            <h4 className="post__text">~ {caption}</h4>

            <img src={imageUrl} className="post__image" alt=""  />

            <div className="post__likeandlove">
                <img src={like2} className="post__like" alt="post pic"/>
                
            <p>{noLikes} {noLikes === 1 ? "Like" : "Likes"}</p>
            </div>

            <div class="hr" />

            <div className="post__likeoptions">
                <div className="like" onClick={likeHandle}>
                    <i className={show} />
                    <h3 className={show2}>Like</h3>
                </div>
                <div className="comment">
                    <i className="comment2" />
                    <h3 class="dope">Comment</h3>
                </div>
                <div className="share">
                    <i className="share2" />
                    <h3>Share</h3>
                </div>
            </div>
            <form onSubmit={postComment}>
                <div className="commentBox">
                    <Avatar
                        className="post__avatar2"
                        alt=""
                        src={user?.photoURL}
                    />
                    <input className="commentInputBox" type="text" placeholder="Write a comment ... " value={comment} onChange={(e) => setComment(e.target.value)} />
                    <input type="submit" disabled={!comment} className="transparent__submit" />
                </div>
                <p className="pressEnterToPost">Press Enter to post</p>
            </form>

            {
                comments.map((comment) => (
                    <div className={`comments__show ${comment.username === postUser?.displayName && 'myself'}`}>
                        <Avatar
                            className="post__avatar2"
                            alt=""
                            src={comment.photoURL}
                        />
                        <div class="container__comments">
                            <p><span>{comment.username}</span><i class="post__verified"></i>&nbsp;{comment.text}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Post
