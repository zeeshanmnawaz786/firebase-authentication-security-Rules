import React, { useEffect, useState } from "react";
import { db, auth, signOut } from "../fierbase-auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";

function Dashboard(prop) {
  const [value, setValue] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  var navigate = useNavigate();
  const usersCollectionRef = collection(db, "userPost");

  var id;

  const dataUpdate = () => {
    const data = {
      id,
      post: value,
      userID: auth.lastNotifiedUid,
    };
    setUserPosts((e) => [...e, data]);
  };

  const createPOST = async () => {
    id = await addDoc(usersCollectionRef, {
      post: value,
      userID: auth.lastNotifiedUid,
    });
    console.log(auth.lastNotifiedUid);

    dataUpdate();
    setValue("");
  };
  const getAllPosts = async () => {
    const postData = await getDocs(usersCollectionRef);
    setUserPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deletePost = async (id) => {
    const userDoc = doc(db, "userPost", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    getAllPosts();
  }, [deletePost]);

  var signout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <button onClick={signout}>Sign out</button>

      <h3>{prop.name ? `Welcome ${prop.name}` : "Login please"}</h3>
      <textarea
        cols={30}
        rows={4}
        value={value}
        placeholder="Create Your Post......"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={createPOST}>Post</button>
      <br></br>

      {userPosts.map((post, index) => {
        return (
          <div key={index}>
            <p>{post.post}</p>
            <button
              onClick={() => {
                deletePost(post.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
