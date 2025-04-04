import { useParams } from "react-router-dom";
import Chat from "../pages/Chat";

const ChatWrapper = () => {
  const { chatId } = useParams();
  return <Chat chatId={chatId} />;
};

export default ChatWrapper;
