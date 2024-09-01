import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import InteractiveMap from './component/InteractiveMap';
import UserLocation from './component/UserLocation';
import Iraqmap from './component/Iraqmap';

const App: React.FC = () => {
  
  return (
    <Router>
      <Sidebar />
      <div>
        <Routes>
          <Route path="/" element={<UserLocation />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/iraq" element={<Iraqmap />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
