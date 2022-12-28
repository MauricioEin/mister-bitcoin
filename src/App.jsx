import './assets/style/main.scss'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticPage } from './pages/StatisticPage'
import { ContactDetailsPage } from './pages/ContactDetailsPage'
import { ContactEditPage } from './pages/ContactEditPage'
import { SignupPage } from './pages/SignupPage'
import { AppHeader } from './cmps/AppHeader'
import { useSelector } from 'react-redux'

function PrivateCmp(props) {
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)

  return (
    loggedInUser ? <Route {...props} />
      : <Redirect to="/signup" />
  )
}



export function App() {

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Switch>
          <PrivateCmp component={ContactEditPage} path="/contact/edit/:id?" />
          <PrivateCmp component={ContactDetailsPage} path="/contact/:id" />
          <PrivateCmp component={ContactPage} path="/contact" />
          <PrivateCmp component={StatisticPage} path="/statistic" />
          <Route component={SignupPage} path="/signup" />
          <PrivateCmp component={HomePage} path="/" />

        </Switch>
      </div>
    </Router>
  )
}