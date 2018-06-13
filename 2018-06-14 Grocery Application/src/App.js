import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './App.css'

// C. Oakman
// The App component below depends on the following components, so we import them
// into this module here.
import NavBar from './components/NavBar.js'
import Homepage from './components/Homepage.js'
import Dashboard from './components/Dashboard.js'
import Groceries from './components/Groceries.js'

// C. Oakman
// By convention, the top-level Component for React applications is named "App" (short for "Application")
// This is a Class-based component that has some internal state. Notably which
// "page" is active (stored as this.state.route)
class App extends Component {
  // C. Oakman
  // For Class-based components, you *must* call super() inside the constructor method
  // like this. The constructor will be passed props, and those need to be passed to super
  // as well.
  constructor (props) {
    super(props)

    // C. Oakman
    // We can set up some initial state for our component inside the constructor function.
    // Note, inside the constructor is the *only* place where we can set this.state directly.
    // In any other method inside our class, we must use this.setState({key: value}) instead.
    this.state = {
      route: '/home'
    }

    // C. Oakman
    // Set up hash-based routing in the Constructor. Note this is a little bit unorthodox
    // for React.js since we are adding an event to the "real" DOM instead of a Virtual DOM node.
    // Since App is our top-level component and there should only be one of them
    // on the page, I think this is fine.
    window.onhashchange = () => { this.hashChange() }
  }

  // C. Oakman
  // Kick off initial routing after the component has mounted.
  componentDidMount () {
    this.hashChange()
  }

  // C. Oakman
  // Very simple hash-based routing here. If the routing of your application needs
  // to be more complex than this I recommend using a library like react-router (or similar)
  // General principle: do not add libraries unless you need them.
  hashChange () {
    const validRoutes = ['/home', '/dashboard', '/groceries']
    const defaultRoute = '/home/'
    const newRoute = window.location.hash.replace(/^#/, '').trim()
    const isValidRoute = validRoutes.includes(newRoute)

    if (isValidRoute) {
      this.setState({route: newRoute})
    } else {
      window.location.hash = defaultRoute
    }
  }

  render () {
    // C. Oakman
    // Note that we can use normal JS conditions here to determine what the active
    // "page" should be. The render function in React is a normal JS function.
    let pageComponent = <Homepage />
    if (this.state.route === '/dashboard') {
      pageComponent = <Dashboard />
    } else if (this.state.route === '/groceries') {
      pageComponent = <Groceries />
    }

    // C. Oakman
    // Render functions should be small (usually less than 10 lines).
    // If you have a long render function that is usually a sign that you need to
    // break it up into more components. More components = more composability
    return (
      <main className='main-app'>
        <h1 className='title'>Grocery Application</h1>
        <NavBar activeRoute={this.state.route} />
        {pageComponent}
      </main>
    )
  }
}

export default App