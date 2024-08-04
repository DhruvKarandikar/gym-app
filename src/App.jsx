import MainPageApp from "./components/mainpage";
import "./App.css"
import LoginForm from "./components/home";
import Signup from "./components/signup";
import { Route, Routes} from 'react-router-dom';


function App() {

  return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><h1>Gym Set Go</h1></a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<MainPageApp />} />
        </Routes>
      </div>
  );
}

export default App
