import React, { Component } from 'react';
import axios from 'axios'
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

import Login from './components/Login'
import User from './components/User'
import Chapters from './components/Chapters'
import ChapterDetails from './components/ChapterDetails'
import RecipeDetails from './components/RecipeDetails'
import NewRecipe from './components/NewRecipe'

const apiURL = 'http://localhost:8080/api'

export default withRouter(class App extends Component {
  constructor(props) {
    super()
    this.state = {
      recipes: [],
      chapters: [],
      users: [],
      user_id: '',
      newIngredient: ''
    }
  }

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

  postRecipe = () => {
    axios({
      method: "POST",
      url: `${apiURL}/recipes`,
      data: {
        name: this.state.newRecipeName,
        mainProtein: this.state.newMainProtein,
        directions: this.state.newDirections,
        ingredients: this.state.newIngredients,
      }
    }).then(newRecipe => {
      this.setState(prevState => ({
        recipes: [...prevState.recipes, newRecipe.data]
      }));
      this.props.history.push("/recipes/:id");
    });
  }
  postNewIngredient = (e) => {
    axios({
      method: 'POST',
      url: `${apiURL}/${e.target.id}/newIngredient`,
      data: {
        item: this.state.newIngredient
      }
    })
      .then(newRecipe => {
        this.setState(
          {
            newIngredient: ''
          }
        )
        this.getRecipes()
        this.props.history.push(`/recipe/${newRecipe.data._id}`)
      })
  }
  deleteRecipe = (e) => {
    e.preventDefault()
    axios
      .delete(`${apiURL}/recipes/${e.target.id}`)
      .then(res => {
        this.props.history.push('/chapters')
        this.setState(
          {
            recipes: res.data
          }
        )
      })
  }
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
      .get(`${apiURL}/users/${e.target.id}`)
      .then(res => {
        this.props.history.push('/')
        this.setState(
          {
            currentUser: res.data
          }
        )
      })
      .catch(error => console.log('error', error))
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
          users: res.data,
          user_id: res.data[res.data.findIndex(user => {
            return user.email === this.state.currentUser
          })]._id
        })
        this.props.history.push(`/user/${this.state.user_id}`)
      })
  }
  putUser = (e) => {
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
      .delete(`${apiURL}/users/${e.target.id}`)
      .then(res => {
        this.props.history.push('/')
        this.setState(
          {
            users: res.data,
            currentUser: ''
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

  componentDidMount() {
    this.getRecipes()
    this.getChapters()
  }
  
  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Link to={`/user/${this.state.user_id}`}>
              Welcome {this.state.currentUser}
            </Link>
          </div>
          <div>
            <Link to="/chapters">
              Chapters
            </Link>
          </div>
          <div>
            <Link to="/recipe/new">
              Add New Recipe
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
            /><Route
              exact path='/chapters'
              render={
                () => <Chapters
                  chapters={this.state.chapters}
                />
              }
            />
            <Route
              exact path='/chapters/:id'
              render={
                routerProps => <ChapterDetails
                  {...routerProps}
                  chapters={this.state.chapters}
                  recipes={this.state.recipes}
                />
              }
            />
            <Route
              exact path='/chapters/:id/:recipeId'
              render={
                routerProps => <RecipeDetails
                  {...routerProps}
                  handleDelete={this.deleteRecipe}
                  recipes={this.state.recipes}
                />
              }
            />
            <Route
              exact path='/recipe/new'
              render={
                () => <NewRecipe
                  handleFormChange={this.handleFormChange}
                  handleNewRecipe={this.postRecipe}
                  postNewIngredient = {this.postNewIngredient}
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