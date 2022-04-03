import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./LeftChatPart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../../context/authCtx";
import {
  createRoomCreator,
  deleteMessagesCreator,
  fetchMessagesCreator,
  fetchRoomsCreator,
} from "../../../redux/creators";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import user from "./user.png";

const LeftChatPart = () => {
  const [room, setRoom] = useState("");
  const [freandNick, setFreandNick] = useState("");
  const [isCreateRoomWindowOpen, setIsCreateRoomWindowOpen] = useState(false);

  const myId = localStorage.getItem("_id");
  const [isRoomToggle, setIsRoomToggle] = useState(false);
  const authCtx = useContext(AuthContext);

  const userRooms = useSelector((store) => store.roomReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .post("/api/auth/fetchRooms", {
        _id: localStorage.getItem("_id"),
      })
      .then(({ data }) => {
        dispatch(fetchRoomsCreator(data));
      });
  }, []);

  const isCreateRoomWindowOpenToggle = () =>
    setIsCreateRoomWindowOpen((prev) => !prev);

  const toggleRoomHandler = async (roomName, roomId) => {
    localStorage.setItem("room", roomName);
    localStorage.setItem("roomId", roomId);

    axios
      .post("/api/auth/fetchMessages", {
        roomId: localStorage.getItem("roomId"),
      })
      .then((res) => {
        dispatch(fetchMessagesCreator(res.data.messages));
      });
    await authCtx.socket.emit("join_room", {
      roomId: localStorage.getItem("roomId"),
      _id: localStorage.getItem("_id"),
    });
    setIsRoomToggle((prev) => !prev);
  };

  useEffect(() => {
    const joinToRoom = async () => {
      await authCtx.socket.emit("join_room", {
        roomId: localStorage.getItem("roomId"),
        _id: localStorage.getItem("_id"),
      });
    };
    joinToRoom();
  }, []);

  const onChangeRoomHandler = (e) => setRoom(e.target.value);
  const onChangeFreandNickHandler = (e) => setFreandNick(e.target.value);

  const onCreateRoomHandler = (e) => {
    e.preventDefault();
    if (room !== "" && freandNick !== "") {
      axios
        .post("/api/auth/createRoom", {
          roomName: room,
          myId: myId,
          freandNick: freandNick,
        })
        .then((data) => {
          localStorage.setItem("roomId", data.data._id);
          if (data.status === 200) {
            dispatch(createRoomCreator(room, data.data._id));
            localStorage.setItem("room", room);
            setRoom("");
            setFreandNick("");
            toast.warning("Chat is created successfully");
            setIsCreateRoomWindowOpen((prev) => !prev);
            dispatch(deleteMessagesCreator());
            toggleRoomHandler(localStorage.getItem('roomцй'),localStorage.getItem('roomId'));
          }
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("This nickname notfound");
        });
    } else {
      toast.warning("Chat name and FreandNick not filled");
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div style={{ position: "absolute" }}>
        {isCreateRoomWindowOpen ? (
          <i
            onClick={isCreateRoomWindowOpenToggle}
            class="medium material-icons"
          >
            expand_less
          </i>
        ) : (
          <i
            title="Create new chat"
            onClick={isCreateRoomWindowOpenToggle}
            class="medium material-icons"
          >
            expand_more
          </i>
        )}
      </div>

      {isCreateRoomWindowOpen === true ? (
        <form onSubmit={onCreateRoomHandler}>
          <div className={styles["create-chat-title"]}>Create new chat</div>
          <div style={{ marginBottom: "55px", textAlign: "center" }}>
            <TextField
              style={{ width: "350px" }}
              onChange={onChangeRoomHandler}
              id="outlined-basic"
              label="Room name"
              variant="outlined"
              value={room}
            />
          </div>
          <div style={{ marginBottom: "50px", textAlign: "center" }}>
            <TextField
              style={{ width: "350px" }}
              onChange={onChangeFreandNickHandler}
              id="outlined-basic"
              label="Freand nick"
              variant="outlined"
              value={freandNick}
            />
          </div>
          <Button
            type="submit"
            style={{ display: "block", margin: "auto" }}
            variant="contained"
          >
            Create chat
          </Button>
        </form>
      ) : (
        ""
      )}
      {isCreateRoomWindowOpen === false ? (
        <>
          <div className={styles["chats-list-wrapper"]}>My chats</div>
          <div className={styles["rooms-wrapper"]}>
            {userRooms.map((room) => {
              if (room.roomId === localStorage.getItem("roomId")) {
                return (
                  <div
                    className={styles["active-room"]}
                    onClick={() =>
                      toggleRoomHandler(room.roomName, room.roomId)
                    }
                  >
                    <img
                      src={user}
                      alt=""
                      width="60px"
                      height="60px"
                      style={{ borderRadius: "100%" }}
                    />
                    <div style={{ marginLeft: "15px" }}>{room.roomName}</div>
                  </div>
                );
              } else {
                return (
                  <div
                    className={styles["anactive-room"]}
                    onClick={() =>
                      toggleRoomHandler(room.roomName, room.roomId)
                    }
                  >
                    <img
                      src={user}
                      alt=""
                      width="60px"
                      height="60px"
                      style={{ borderRadius: "100%" }}
                    />
                    <div style={{ marginLeft: "15px" }}>{room.roomName}</div>
                  </div>
                );
              }
            })}
          </div>
        </>
      ) : (
        ""
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LeftChatPart;
