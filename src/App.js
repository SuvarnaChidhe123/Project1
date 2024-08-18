import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashbord from './Pages/Dashbord';
import Overview from './Pages/Overview';
import PeopleDirectory from './Pages/PeopleDirectory';
import UserProfile from './Pages/UserProfile';
function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <div className="flex">
    
   
        <div >
        <Dashbord/>
        {/* <UserProfile/> */}
          <Routes>
          <Route path="/" element={<Dashbord/>} />

            <Route path="/overview" element={<Overview />} />
            <Route path="/people-directory" element={<PeopleDirectory />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
