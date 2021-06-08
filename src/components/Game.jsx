
import { useSelector } from "react-redux";
import GameTable from "./GameTable";
import PlayerName from "./PlayerName";

const Game = () => {

  const globalName = useSelector(state => state.game.name)

  return ( 
    <>
    { globalName ?  
    <GameTable />
    :
    <PlayerName />
  }
    </>
   );
}
 
export default Game;
