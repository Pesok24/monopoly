import { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { setName } from "../slice/gameSlice";


const QuitButton = () => {

  const socketRef = useRef()
  let { roomNumb } = useParams()
  let playerName = useSelector ( state => state.game.name )
  const dispatch = useDispatch()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return ( 
    <>
    <Button onClick={handleShow}>Выйти</Button>


<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Выйти из игры?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Нет
          </Button>
          <Link to='/'><Button variant="primary" onClick={() => {
            handleClose()
            dispatch(setName(''))
            socketRef.current = io.connect(process.env.REACT_APP_IO_CONNECT_IP)
            socketRef.current.emit('quitPlayer', { room: roomNumb, name: playerName })
            return () => socketRef.current.disconnect()
          }}>
            Да
          </Button></Link>
        </Modal.Footer>
      </Modal>
    </>
   );
}
 
export default QuitButton;
