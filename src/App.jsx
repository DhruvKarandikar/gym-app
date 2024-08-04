import MainPageApp from "./components/mainpage";
import "./App.css"

function App() {

  return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><h1>Gym Set Go</h1></a>
            </div>
            <ul className="nav navbar-nav">
              <li><a href="#">Home</a></li>
            </ul>
          </div>
        </nav>
        <MainPageApp />
      </div>
  );
}

export default App
