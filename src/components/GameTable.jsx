import { useEffect, useRef, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { setPlayersData, setCurrent, setName } from "../slice/gameSlice";
import MoneyInput from "./MoneyInput";
import Notification from "./Notification";
import QuitButton from "./QuitButton";


const GameTable = () => {

  const socketRef = useRef()

  const dispatch = useDispatch()

  let playersData = useSelector( state => state.game.playersData )
  let playerName = useSelector ( state => state.game.name )

  let { roomNumb } = useParams()


  const [show, setShow] = useState(false);
  const [sendMoney, setSendMoney] = useState({ targetPlayer: '', room: roomNumb, currentPlayer: playerName })
  const [amountError, setAmountError] = useState(false)
  const [notifData, setNotifData] = useState({})
  const [effPlus, setEffPlus] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
    }


    
    useEffect(() => {
      console.log('useEff');
      socketRef.current = io.connect(process.env.REACT_APP_IO_CONNECT_IP, {
        'reconnection': true,
        'reconnectionDelay': 500,
        'reconnectionAttempts': 10
      })
      
    socketRef.current.emit('getPlayersData', {room: roomNumb})

    socketRef.current.on('playersData', (data) => {
      setAmountError(false)
      dispatch(setPlayersData(data))
      data.map((e) => {
        if ( e.name === playerName ) {
          dispatch(setCurrent(e))
        }
      })
    })

    socketRef.current.on('addMoneyNotif', (data) => {
      setNotifData(data)
    })

    socketRef.current.on('amountError', (data) => {
      if (data.name === playerName)
      setAmountError(data.amountError)
    })

    return () => socketRef.current.disconnect()

  }, [effPlus])

  let counter = 0

  return ( 
  <>
  <Notification data={notifData} />
  <h3 style={{ textAlign: 'center' }}>Номер комнаты: {roomNumb}</h3>
  <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Имя игрока</th>
      <th>Деньги</th>
    </tr>
  </thead>
  <tbody>
    {playersData.map((e) => {
      counter++
      return (
      e.name === playerName ?   
        <tr style={{ backgroundColor: '#03fc90' }}>
          <td>{counter}</td>
          <td>{e.name}</td>
          <td>{numberWithCommas(e.money)}</td>
        </tr>
        :
        <tr onClick={() => {
          setSendMoney({ ...sendMoney, targetPlayer: e.name })
          handleShow()
        }}>
          <td>{counter}</td>
          <td>{e.name}</td>
          <td>{numberWithCommas(e.money)}</td>
        </tr>
      
      )
    })}
  </tbody>
</Table>
{amountError ? 
<p style={{ color: 'red' }}>Нехватает средств!</p>
:
''
}
  <MoneyInput />
  <div style={{ display: 'flex', justifyContent: "center" }}>
  <QuitButton style={{ marginLeft: '10px' }} />
  <Link to='/' style={{ marginLeft: '10px' }}><Button onClick={() => {
      dispatch(setName(''))
  }}>На главную</Button></Link>
   <Button style={{ marginLeft: '10px' }} onClick={() => {
        setEffPlus(effPlus + 1)
      }}>Переподключение</Button>
  </div>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Перевод денег игроку {sendMoney.targetPlayer}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
        <Form.Control type="number" pattern="[0-9]*" placeholder="Введите сумму" onChange={(e) => {
          setSendMoney({ ...sendMoney, amount: e.target.value })
        }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={() => {
          socketRef.current.emit('sendMoney', sendMoney)
            handleClose()
          }}>
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
     
  </>
   );
}
 
export default GameTable;
