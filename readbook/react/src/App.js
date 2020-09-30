import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { KeepAlive } from 'react-keep-alive';


import Header from './headerbox/headerbox'
import AppIndex from './appIndex'
import Bookshelf from './bookshelf'
import Sreach from './sreach'
import Footer from './footerbox/footerbox'
function App () {
  return (
    <div className="App">
      <Header title='目录'></Header>
      <Router>
        <Switch>
          <Route path='/bookshelf' component={Bookshelf}></Route>
          <Route path='/sreach' component={Sreach}></Route>
          <Route path='/index'>
            <KeepAlive name='AppIndex'>
              <AppIndex></AppIndex>
            </KeepAlive>
          </Route>
          <Redirect from='/' to='/index'></Redirect>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
