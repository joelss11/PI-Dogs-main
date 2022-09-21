import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './componentes/LandingPage' 
import Home from './componentes/Home';
import CreateDogs from './componentes/CreateDogs';
import Details from './componentes/Details';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path="/dogs" component={CreateDogs}/>
      <Route path="/details/:id" component={Details}/>

 
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
