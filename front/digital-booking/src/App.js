import Router from './route/Router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faWifi, faSwimmer, faHeart, faMapMarkerAlt, faImage, faCar, faTv, faSnowflake, faPaw, faCheckCircle, faSmokingBan, faParking, faGlassMartiniAlt, faWheelchair } from '@fortawesome/free-solid-svg-icons'

//Librería para manejar los íconos de fontawesome desde cualquier componente
library.add(fab, faCheckSquare, faCoffee, faWifi, faSwimmer, faHeart, faMapMarkerAlt, faImage, faCar, faTv, faSnowflake, faPaw, faCheckCircle, faSmokingBan, faParking, faGlassMartiniAlt, faWheelchair)

function App() {
  return (
    <div className="App">
       <Router />
    </div>
  );
}

export default App;
