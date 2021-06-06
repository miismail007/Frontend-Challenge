import React, {  Fragment, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from './components/Header'
import './App.css'
import { Provider } from 'react-redux'
import {store} from './store/store'
import MainContent from './components/MainContent'
import Popup from './components/Popup';


function App() {
  const [popup, setpopup] = useState(false)
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Switch>
            <Route
              exact
              name="summary"
              path="/summary"
              component={() =>
                <div>
                  <Header/>
                  <MainContent setpopup={()=>{
                    setpopup(!popup)
                  }}/>
                  {popup && <Popup setpopup={()=>{
                    setpopup(!popup)
                  }}/>}
                </div>
              }
            />
            <Redirect to="/summary" />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  )
}

export default App
