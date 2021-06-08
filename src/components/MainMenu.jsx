import { useState } from "react";
import { Button } from "react-bootstrap";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
import './style/mainMenu.css'

const MainMenu = () => {

  const [showMain, setShowMain] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [showBack, setShowBack] = useState(false)


  return ( 
    <div className='mainContainer'>
    <div className='MainMenuDiv'>
      <h1 className='divText'>Monopoly Online Bank</h1>
      {showMain ? 
      <>
      <Button className='divText' onClick={() => {
        setShowBack(true)
        setShowMain(false)
        setShowCreate(true)
      }}>Создать комнату</Button>
      <Button className='divText' onClick={() => {
        setShowBack(true)
        setShowMain(false)
        setShowJoin(true)
      }}>Присоединиться</Button>
      </> : ''
    }
    {showCreate ? <CreateGame/> : ''}
    {showJoin ? <JoinGame /> : ''}
      {showBack ? <Button style={{ marginTop: '10px' }} onClick={() => {
        setShowMain(true)
        setShowBack(false)
        setShowCreate(false)
        setShowJoin(false)
      }}>Назад</Button> : ''}

    </div>
    </div>
   );
}
 
export default MainMenu;
