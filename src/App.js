
import './App.css';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Department from './components/Department/Department';
import Employee from './components/Employee/Employee';

import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">Company X</h3>
    <Navigation />
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/department' component={Department}/>
      <Route path='/employee' component={Employee}/>

    </Switch>
    
    
    </div>
    </BrowserRouter>
  );
}

export default App;
