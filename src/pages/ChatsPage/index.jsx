import { useContext, useEffect } from "react";
import AuthContext from "../../context/authCtx";
import styles from "./ChatsPage.module.scss";
import { useDispatch } from "react-redux";
import { createMessageCreator } from "../../redux/creators";
import LeftChatPart from "../../components/ChatsPage/LeftChatPart";
import Messages from "../../components/ChatsPage/Messages";
import Header from "../../components/ChatsPage/Header";

const ChatsPage = () => {
  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();

  useEffect(() => {
    authCtx.socket.on("recive_message", (data) => {
      if (data.roomId === localStorage.getItem("roomId")) {
        dispatch(
          createMessageCreator({
            message: data.message,
            userId: data._id,
          })
        );
      }
    });
  }, [authCtx.socket]);
  return (
    <div>
      <Header />
      <div className={styles["page-wrapper"]}>
        <LeftChatPart />
        <Messages />
      </div>
    </div>
  );
};

export default ChatsPage;
