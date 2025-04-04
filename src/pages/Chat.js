import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ chatId }) => {
  const user = auth.currentUser;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const msgRef = collection(db, "chats", chatId, "messages");
    const q = query(msgRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const msgRef = collection(db, "chats", chatId, "messages");
    await addDoc(msgRef, {
      senderId: user.uid,
      message: text,
      timestamp: serverTimestamp(),
    });
    setText("");
  };

  return (
    <div className="container mt-5">
      <h4>Real-Time Chat</h4>
      <div className="card p-3 mb-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.senderId === user.uid ? "text-end" : "text-start"}`}>
            <span className="badge bg-secondary">{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
          placeholder="Type your message..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
