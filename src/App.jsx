import './assets/style/main.scss'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticPage } from './pages/StatisticPage'
import { ContactDetailsPage } from './pages/ContactDetailsPage'
import { ContactEditPage } from './pages/ContactEditPage'
import { SignupPage } from './pages/SignupPage'
import { AppHeader } from './cmps/AppHeader'
import { Component } from 'react'
import { connect } from 'react-redux'
import { loadLoggedUser } from './store/actions/user.actions'

// import { userService } from './services/user.service'

class _PrivateCmp extends Component {

  render() {
    const { loggedInUser } = this.props
    return (
      loggedInUser ? <Route {...this.props} />
        : <Redirect to="/signup" />
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  }
}
const mapDispatchToProps = {
  loadLoggedUser
}


const PrivateCmp = connect(mapStateToProps, mapDispatchToProps)(_PrivateCmp)

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