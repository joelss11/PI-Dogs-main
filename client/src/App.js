import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './componentes/LandingPage' 
import Home from './componentes/Home';
import CreateDogs from './componentes/CreateDogs';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path="/dogs" component={CreateDogs}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
