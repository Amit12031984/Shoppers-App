import { useState} from 'react';
import Navbar from './components/Navbar';

function App() {

 const [isloggedIn,setIsLoggedIn] = useState(false);

  return (
    <div>
      <Navbar data={setIsLoggedIn} initial={isloggedIn}/>
    </div>
  );
}

export default App;
