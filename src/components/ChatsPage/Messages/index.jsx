import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../context/authCtx";
import styles from "./Messages.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessageCreator,
  fetchMessagesCreator,
} from "../../../redux/creators";

const Messages = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const chartListRef = useRef();
  const authCtx = useContext(AuthContext);
  const chatMessages = useSelector((store) => store.chatReducer);

  const onChangeMessageHandler = (e) => setMessage(e.target.value);

  const onSendMessageHandler = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      axios.post("/api/auth/sendMessage", {
        message: message,
        userId: localStorage.getItem("_id"),
        roomId: localStorage.getItem("roomId"),
      });
      dispatch(
        createMessageCreator({
          message: message,
          userId: localStorage.getItem("_id"),
        })
      );
      authCtx.socket.emit("send_message", {
        _id: localStorage.getItem("_id"),
        message: message,
        roomId: localStorage.getItem("roomId"),
      });
      setMessage("");
    }
  };

  useEffect(() => {
    chartListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [chatMessages]);

  useEffect(() => {
    chartListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    if (localStorage.getItem("room") !== "") {
      axios
        .post("/api/auth/fetchMessages", {
          roomId: localStorage.getItem("roomId"),
        })
        .then((res) => dispatch(fetchMessagesCreator(res.data.messages)))
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  return (
    <div className={styles["join-room-wrapper"]}>
      <div className={styles["chats"]}>
        <div
          style={{
            overflowY: "scroll",
            minHeight: "520px",
            maxHeight: "520px",
          }}
        >
          {chatMessages.map((message) => {
            if (message.userId === localStorage.getItem("_id")) {
              return (
                <div className={styles["my-message"]}>
                  <div>{message.message}</div>
                </div>
              );
            } else {
              return (
                <div className={styles["not-my-message"]}>
                  <div>{message.message}</div>
                </div>
              );
            }
          })}
          <div ref={chartListRef}></div>
        </div>
      </div>

      <div>
        <form
          onSubmit={onSendMessageHandler}
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "100px",
            paddingTop: "20px",
          }}
        >
          <div>
            <input
              style={{ width: "740px" }}
              onChange={onChangeMessageHandler}
              value={message}
              placeholder="input message..."
            />
          </div>
          <div>
            <button
              style={{
                background: "linear-gradient(to right top,#016EFF,black)",
                borderRadius: "10px",
              }}
              class="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              <i
                style={{ fontSize: "30px", transform: "rotate(-45deg)" }}
                class="material-icons"
              >
                send
              </i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Messages;
