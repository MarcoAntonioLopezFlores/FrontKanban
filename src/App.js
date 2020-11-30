import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Nav from './components/Nav'
import ListProductsBacklog from './pages/product/ListProductsBacklog'
import ListProject from './pages/project/ListProject'
import ReportsProjects from './pages/project/ReportsProjects'
import ReportsKanban from './pages/project/ReportsKanban'
import TableKanban from './pages/project/TableKanban'
import ListScrumTeam from './pages/team/ListScrumTeam'

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>        
          <Switch>            
            <Route exact path={["/project/list","/"]} component={ListProject} />  
            <Route exact path="/project/report" component={ReportsProjects} />  
            <Route exact path="/project/report/kanban" component={ReportsKanban} />  
            <Nav>
            <Route exact path="/project/table" component={TableKanban} />
            <Route exact path="/team/table" component={ListScrumTeam} />
            <Route exact path="/products/table" component={ListProductsBacklog} />
            </Nav>              
          </Switch>          
        </Router>        
      </React.Fragment>
    )
  }
}
