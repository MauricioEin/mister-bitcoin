import './assets/style/main.scss'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticPage } from './pages/StatisticPage'
import { ContactDetailsPage } from './pages/ContactDetailsPage'
import { ContactEditPage } from './pages/ContactEditPage'
import { AppHeader } from './cmps/AppHeader'

export function App() {

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Switch>
        <Route component={ContactEditPage} path="/contact/edit/:id?" />
        <Route component={ContactDetailsPage} path="/contact/:id" />
          <Route component={ContactPage} path="/contact" />
          <Route component={StatisticPage} path="/statistic" />
          <Route component={HomePage} path="/" />
        </Switch>
      </div>
    </Router>
  )
}
