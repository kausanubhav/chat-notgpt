import { useContext, useState } from "react";
import { collection, query, where, getDocs,getDoc,doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
export default function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  //fetch currentUser from context
  const { currentUser } = useContext(AuthContext);
  //handleSearch
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    const querySnapshot = await getDocs(q);

    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  //handleKeyDown
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  //handleSelect
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exits or not
    //if not, create one
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      
      const res = await getDoc(doc(db, "chats",combinedId));
      //if res does not exist, create a chat in chats collection      
      if(!res.exists()){
        await setDoc(doc(db,"chats",combinedId),{messages:[]});

        //create user chats
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });




      }
    } catch (error) { }
    setUser(null);  
    setUserName('');
  };

  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="user-chat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="user-chat-info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
