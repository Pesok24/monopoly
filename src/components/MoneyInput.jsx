import { useRef, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { io } from "socket.io-client";

const MoneyInput = () => {

  const currentPlayer = useSelector( state => state.game.name )
  const [newValue, setNewValue] = useState('') 
  const socketRef = useRef()

  let { roomNumb } = useParams()


  return ( 
    <>
      <InputGroup className="mb-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ textAlign: "center" }}>Введите сумму которую хотите добавить или отнять:</p>
        <div style={{ display: 'flex' }}>
    <FormControl
      type="number"
      placeholder="Число"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      value={newValue}
      pattern="[0-9]*"
     onChange={(e) => {
      setNewValue(e.target.value)
     }}/>
    <InputGroup.Append>
      <Button variant="outline-primary" onClick={() => {
        socketRef.current = io.connect(process.env.REACT_APP_IO_CONNECT_IP)
        socketRef.current.emit('changeMoneyValueMinus', {playerName: currentPlayer, value: newValue, room: roomNumb})
        setNewValue('')
        return () => socketRef.current.disconnect()

      }}>-</Button>
            <Button variant="outline-primary" onClick={() => {
        socketRef.current = io.connect(process.env.REACT_APP_IO_CONNECT_IP)
        socketRef.current.emit('changeMoneyValue', {playerName: currentPlayer, value: newValue, room: roomNumb})
        setNewValue('')
        return () => socketRef.current.disconnect()

      }}>+</Button>
      <Button variant="outline-primary" onClick={() => {
        socketRef.current = io.connect(process.env.REACT_APP_IO_CONNECT_IP)
        socketRef.current.emit('circleMoney', {playerName: currentPlayer, room: roomNumb})
        setNewValue('')
        return () => socketRef.current.disconnect()
      }}>Круг</Button>
    </InputGroup.Append>
    </div>
  </InputGroup>
    </>
   );
}
 
export default MoneyInput;
