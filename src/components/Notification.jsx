import { useEffect } from 'react';
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


const Notification = (props) => {


  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
    }

  useEffect(() => {

    switch (props.data.action) {
      case 'addMoney':
        store.addNotification({
          title: "Добавление!",
          message: `${props.data.playerName} добавил себе ${numberWithCommas(props.data.value)}`,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        });
        break;

        case 'minusMoney':
          store.addNotification({
            title: "Убавление!",
            message: `${props.data.playerName} отнял у себя ${numberWithCommas(props.data.value)}`,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
          });
          break;

          case 'sendMoney':
            store.addNotification({
              title: "Передача!",
              message: `${props.data.playerName} передал ${props.data.targetName} сумму: ${numberWithCommas(props.data.value)}`,
              type: "info",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 2000,
                onScreen: true
              }
            });
            break;

            case 'circleMoney':
              store.addNotification({
                title: "Деньги за круг!",
                message: `${props.data.playerName} добавил себе ${numberWithCommas(props.data.value)} за круг!`,
                type: "info",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: true
                }
              });
              break;
    
      default:
        break;
    }

  }, [ props.data ] )

  return ( 
    <>
  <ReactNotification />
    </>
   );
}
 
export default Notification;
