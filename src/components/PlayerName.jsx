import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { setName } from "../slice/gameSlice";

const PlayerName = () => {

  const [newName, setNewName] = useState('')
  const [errorNotif, setErrorNotif] = useState(false)
  const dispatch = useDispatch()


  const socketRef = useRef()

  let { roomNumb } = useParams()

  return ( 
    <>
    <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label style={{ textAlign: 'center' }}>Введите свое имя:</Form.Label>
    <Form.Control type="text" placeholder="Имя" onChange={(e) => {
      setNewName(e.target.value)
    }} />
    {errorNotif ? <p>В комнате максимум участников!</p> : ''}
  </Form.Group>
  <Button variant="primary" onClick={() => {
    socketRef.current = io.connect(process.env.REACT_APP_IO_CONNECT_IP)
    socketRef.current.emit('checkForMax', {room: roomNumb, name: newName})
    socketRef.current.on('maxPlayersStatus', (data) => {
      console.log('status');
      if (data.error) {
        setErrorNotif(true)
      }
      else {
        setErrorNotif(false)
        dispatch(setName(newName))
        // socketRef.current = io.connect(process.env.REACT_APP_IO_CONNECT_IP)
          socketRef.current.emit('newPlayer', {name: newName, room: roomNumb})
        }
        return () => socketRef.current.disconnect()
    })

  }}>
    Войти
  </Button>
<Link to='/'><Button style={{ marginTop: '10px' }}>На главную</Button></Link>
</Form>

    </>
   );
}
 
export default PlayerName;
