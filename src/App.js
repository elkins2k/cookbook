import React, { Component } from 'react';
import axios from 'axios'
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

import Login from './components/Login'

const apiURL = 'http://localhost:8080/api'

export default withRouter ( class App extends Component {
  constructor ( props ) {
    super ()
    this.state = {
      recipes: [],
      chapters: [],
      users:[]
    }
  }

  // ***** RECIPE(S) ROUTER FUNCTIONS *****
  getRecipes = () => {
    axios
      .get ( `${apiURL}/recipes` )
      .then ( res => {
        this.setState (
          {
            recipes: res.data
          }
        )
      })
  }
  getRecipe = () => {
    axios
      .get ( `${apiURL}/recipes/:id` )
      .then ( res => {
        this.setState (
          {
            recipes: res.data
          }
        )
      })
  }
  postRecipe = () => {
    axios
      .post ( `${apiURL}/recipes`)
      .then ( res => {
        this.setState (
          {
            recipes: res.data
          }
        )
      })
  }
  putRecipe = () => {
    axios
      .put ( `${apiURL}/recipes/:id` )
      .then ( res => {
        this.setState (
          {
            recipes: res.data
          }
        )
      })
  }
  deleteRecipe = () => {
    axios
      .delete ( `${apiURL}/recipes/:id` )
      .then ( res => {
        this.props.history.push ('/')
        this.setState (
          {
            recipes: res.data
          }
        )
      })
  }
// ***** CHAPTER(S) ROUTER FUNCTIONS *****
  getChapters = () => {
    axios
      .get ( `${apiURL}/chapters` )
      .then ( res => {
        this.setState (
          {
            chapters: res.data
          }
        )
      })
  }
  getChapter = () => {
    axios
      .get ( `${apiURL}/chapters/:id` )
      .then ( res => {
        this.setState (
          {
            chapters: res.data
          }
        )
      })
  }
  postChapter = () => {
    axios
      .post ( `${apiURL}/chapters`)
      .then ( res => {
        this.setState (
          {
            chapters: res.data
          }
        )
      })
  }
  putChapter = () => {
    axios
      .put ( `${apiURL}/chapters/:id` )
      .then ( res => {
        this.setState (
          {
            chapters: res.data
          }
        )
      })
  }
  deleteChapter = () => {
    axios
      .delete ( `${apiURL}/chapters/:id` )
      .then ( res => {
        this.props.history.push ('/')
        this.setState (
          {
            chapters: res.data
          }
        )
      })
  }
// ***** USER(S) ROUTER FUNCTIONS *****
  getUsers = () => {
    axios
      .get ( `${apiURL}/users` )
      .then ( res => {
        this.setState (
          {
            currentUser: res.data
          }
        )
      })
  }
  getUser = (e) => {
    e.preventDefault ()
    axios
      .get ( `${apiURL}/users/:id` )
      .then ( res => {
        this.props.history.push ('/')
        this.setState (
          {
            currentUser: res.data
          }
        )
        console.log (this.state.currentUser)
      })
      .catch (error => console.log (error))
  }
  postUser = () => {
    axios
      .post ( `${apiURL}/users`)
      .then ( res => {
        this.setState (
          {
            currentUser: res.data
          }
        )
        console.log (this.state.currentUser)
      })
  }
  putUser = () => {
    axios
      .put ( `${apiURL}/users/:id` )
      .then ( res => {
        this.setState (
          {
            users: res.data
          }
        )
      })
  }
  deleteUser = () => {
    axios
      .delete ( `${apiURL}/users/:id` )
      .then ( res => {
        this.props.history.push ('/')
        this.setState (
          {
            users: res.data
          }
        )
      })
  }

  handleFormChange = e => {
    console.log (e.target)
    this.setState (
      {
        [e.target.name]: e.target.value
      }
    )
  }
  
  handleLogin = (emailAddress) => {
    
  }

  componentDidMount () { 
    this.getUsers () 
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <Link to = '/login'>
            Login
          </Link>
          <Link to = "/register">
            Register New User
          </Link>
          <Link to ="/cookbook">
            COOKBOOK Home Page
          </Link>
        </header>
        <main>
          <Switch>
            <Route 
              exact path = '/login'
              render = {
                () => <Login
                  users = {this.state.users}
                  // getUsers = {this.getUsers}
                  handleSubmimt = {this.postUser}
                  handleFormChange = {this.handleFormChange}
                />
              }
            />
            <Route
              path = '*'
              render = {
                () => <Redirect to = '/' />
              }
            />
          </Switch>
        </main>
      </div>
    )
  }
})