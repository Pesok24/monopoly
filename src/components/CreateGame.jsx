import { nanoid } from "nanoid";
import { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { setFromJoin } from "../slice/gameSlice";
import './style/createGame.css'

const CreateGame = () => {

  const [gameSettings, setGameSettings] = useState({maxPlayers: '1', startMoney: '', room: '', circleMoney: ''})

  useEffect(() => {
   setGameSettings({...gameSettings, room: nanoid(5)})
  }, [])

  const socketRef = useRef()
  const dispatch = useDispatch()

  return ( 
    <>
    <div className='createDiv'></div>
    <h2>Создать игру</h2>
    <Form.Label>Деньги на старте:</Form.Label>
    <Form.Control style={{ width: '85%' }} type="number" placeholder="Введите число" onChange={(e) => {
      setGameSettings({...gameSettings, startMoney: e.target.value})
    }} />

        <Form.Label>Деньги за круг:</Form.Label>
    <Form.Control style={{ width: '85%' }} type="number" placeholder="Введите число" onChange={(e) => {
      setGameSettings({...gameSettings, circleMoney: e.target.value})
    }} />

    <Form.Label>Кол-во игроков:</Form.Label>
    <Form.Control style={{ width: '85%' }} as="select" onChange={(e) => {
      setGameSettings({...gameSettings, maxPlayers: e.target.value})
    }} custom>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
    </Form.Control>
    <Link to={'/game/' + gameSettings.room}><Button style={{ marginTop: '10px' }} onClick={() => {
      dispatch(setFromJoin(false))
      localStorage.setItem('room', gameSettings.room)
      socketRef.current = io.connect(process.env.REACT_APP_IO_CONNECT_IP)
    
      socketRef.current.emit('gameSettings', gameSettings)
  
      return () => socketRef.current.disconnect()

    }}>Создать</Button></Link>
   </>
     
   );
}
 
export default CreateGame;
