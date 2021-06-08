import { useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { setFromJoin } from "../slice/gameSlice";

const JoinGame = () => {

  const [roomNumb, setRoomNumb] = useState('')
  const [exsistStatus, setExsistStatus] = useState('')
  const socketRef = useRef()


  const dispatch = useDispatch()

  return ( 
    <>
    <h3 style={{ textAlign: 'center' }}>Присоединиться к игре</h3>
    <Form.Label>Номер комнаты:</Form.Label>
    <Form.Control style={{ width: '85%' }} type="text" placeholder="Введите число" onChange={(e) => {
      setRoomNumb(e.target.value)
      if (e.target.value.length == 5) {
        socketRef.current = io.connect(process.env.REACT_APP_IO_CONNECT_IP)
        socketRef.current.emit('checkRoom', {room: e.target.value})
        socketRef.current.on('getRoomStatus', (data) => {
          setExsistStatus(data.exsist)
        })
        return () => socketRef.current.disconnect()
    }
    else {
      setExsistStatus('')
    }
  } 
      }
    />
        <Form.Text className="text-muted">
      Введите 5 символов
    </Form.Text>
    { exsistStatus === '' ? ''  : exsistStatus ? <Link to={'/game/' + roomNumb}><Button style={{ marginTop: '10px' }} onClick={() => {
      dispatch(setFromJoin(true))
    }}>Присоединиться</Button></Link> : <h3 style={{ textAlign: 'center' }}>Такой комнаты не существует!</h3> }
    { exsistStatus === '' && roomNumb.length == 5 ? <Spinner animation="border" /> : ''}
    </>
   );
}
 
export default JoinGame;
