import React, { Component } from 'react';
import axios from 'axios'
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

import Login from './components/Login'
import User from './components/User'
import Recipes from './components/Recipes'

const apiURL = 'http://localhost:8080/api'

export default withRouter(class App extends Component {
  constructor(props) {
    super()
    this.state = {
      recipes: [],
      chapters: [],
      users: [],
      user_id: ''
    }
  }

  // ***** RECIPE(S) ROUTER FUNCTIONS *****
  getRecipes = () => {
    axios
      .get(`${apiURL}/recipes`)
      .then(res => {
        this.setState(
          {
            recipes: res.data
          }
        )
      })
  }
  getRecipe = () => {
    axios
      .get(`${apiURL}/recipes/:id`)
      .then(res => {
        this.setState(
          {
            recipes: res.data
          }
        )
      })
  }
  postRecipe = () => {
    axios
      .post(`${apiURL}/recipes`)
      .then(res => {
        this.setState(
          {
            recipes: res.data
          }
        )
      })
  }
  putRecipe = () => {
    axios
      .put(`${apiURL}/recipes/:id`)
      .then(res => {
        this.setState(
          {
            recipes: res.data
          }
        )
      })
  }
  deleteRecipe = () => {
    axios
      .delete(`${apiURL}/recipes/:id`)
      .then(res => {
        this.props.history.push('/')
        this.setState(
          {
            recipes: res.data
          }
        )
      })
  }
  // ***** CHAPTER(S) ROUTER FUNCTIONS *****
  getChapters = () => {
    axios
      .get(`${apiURL}/chapters`)
      .then(res => {
        this.setState(
          {
            chapters: res.data
          }
        )
      })
  }
  getChapter = () => {
    axios
      .get(`${apiURL}/chapters/:id`)
      .then(res => {
        this.setState(
          {
            chapters: res.data
          }
        )
      })
  }
  postChapter = () => {
    axios
      .post(`${apiURL}/chapters`)
      .then(res => {
        this.setState(
          {
            chapters: res.data
          }
        )
      })
  }
  putChapter = () => {
    axios
      .put(`${apiURL}/chapters/:id`)
      .then(res => {
        this.setState(
          {
            chapters: res.data
          }
        )
      })
  }
  deleteChapter = () => {
    axios
      .delete(`${apiURL}/chapters/:id`)
      .then(res => {
        this.props.history.push('/')
        this.setState(
          {
            chapters: res.data
          }
        )
      })
  }
  // ***** USER(S) ROUTER FUNCTIONS *****
  getUsers = () => {
    axios
      .get(`${apiURL}/users`)
      .then(res => {
        this.setState(
          {
            currentUser: res.data
          }
        )
      })
  }
  getUser = (e) => {
    e.preventDefault()
    axios
      .get(`${apiURL}/users/:id`)
      .then(res => {
        this.props.history.push('/')
        this.setState(
          {
            currentUser: res.data
          }
        )
        console.log(this.state.currentUser)
      })
      .catch(error => console.log(error))
  }
  postUser = (e) => {
    e.preventDefault()
    axios({
      method: 'post',
      url: `${apiURL}/users`,
      data: {
        email: this.state.currentUser
      }
    })
      .then(res => {
        this.setState({
          users: res.data
        })
        console.log()
        this.props.history.push(`/user/${res.data[res.data.findIndex(user => {
          return user.email === this.state.currentUser
        })]._id}`)
      })
  }
  putUser = (e) => {
    // console.log (e.target.id)
    // console.log (this.props, this.state)
    e.preventDefault()
    if (this.state.newFirstName) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { firstName: this.state.newFirstName }
      })
        .then(res => {
          this.setState(
            {
              users: res.data,
              newFirstName: ''
            }
          )
        })
    } else if (this.state.newLastName) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { lastName: this.state.newLastName }
      })
        .then(res => {
          this.setState(
            {
              users: res.data,
              newLastName: ''
            }
          )
        })
    } else if (this.state.newEmail) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { email: this.state.newEmail }
      })
        .then(res => {
          this.setState(
            {
              users: res.data,
              newEmail: ''
            }
          )
        })
    }
  }
  deleteUser = (e) => {
    e.preventDefault()
    axios
      .delete(`${apiURL}/users/:id`)
      .then(res => {
        this.props.history.push('/')
        this.setState(
          {
            users: res.data
          }
        )
      })
  }

  handleFormChange = e => {
    e.preventDefault()
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Link to='/'>
              Welcome {this.state.currentUser}
            </Link>
          </div>
          <div>
            <Link to="/recipes">
              recipes
          </Link>
          </div>
        </header>
        <main>
          <Switch>
            <Route
              exact path='/'
              render={
                () => <Login
                  users={this.state.users}
                  handleSubmit={this.postUser}
                  handleFormChange={this.handleFormChange}
                />
              }
            />
            <Route
              exact path='/recipes'
              render={
                () => <Recipes
                  recipes={this.state.recipes}
                />
              }
            />
            <Route
              path='/user/:id'
              render={
                routerProps => <User
                  {...routerProps}
                  users={this.state.users}
                  handlePutUser={this.putUser}
                  handleFormChange={this.handleFormChange}
                  handleDelete={this.deleteUser}
                />
              }
            />
            <Route
              path='*'
              render={
                () => <Redirect to='/' />
              }
            />
          </Switch>
        </main>
      </div>
    )
  }
})