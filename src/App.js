import React, { Component } from 'react';
import axios from 'axios'
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

import Login from './components/Login'
import User from './components/User'
import Chapters from './components/Chapters'
import ChapterDetails from './components/ChapterDetails'
import RecipeDetails from './components/RecipeDetails'

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
      console.log(newRecipe);
      this.setState(prevState => ({
        recipes: [...prevState.recipes, newRecipe.data]
      }));
      this.props.history.push("/recipes/:id");
    });
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
        this.props.history.push(`/user/${res.data[res.data.findIndex(user => {
          return user.email === this.state.currentUser
        })]._id}`)
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
            users: res.data
          }
        )
      })
  }

  handleFormChange = e => {
    console.log (e.target)
    e.preventDefault()
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleNewItem = e => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${apiURL}/${e.target.id}/newItem`,
      data: { ingredients: this.state.newItem }
    }).then(newRecipe => {
      this.setState({ newItem: "" });
      this.getRecipes()
      this.props.history.push(`/recipes/${newRecipe.data._id}`)
    })
  }

  componentDidMount () {
    this.getRecipes()
    this.getChapters ()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Link to='/user/:id'>
              Welcome {this.state.currentUser}
            </Link>
          </div>
          <div>
            <Link to="/chapters">
              Chapters
            </Link>
          </div>
          <div>
            <Link to="/addNewRecipe">
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
                  putRecipe={this.putRecipe}
                  recipes={this.state.recipes}
                  getRecipes={this.getRecipes}
                  handleFormChange={this.handleFormChange}
                  handleNewItem = {this.handleNewItem}
                />
              }
            />
            {/* <Route
              exact path='/recipes/new'
              render={
                () => <NewRecipe
                  putRecipe={this.putRecipe}
                  recipes={this.state.recipes}
                  getRecipes={this.getRecipes}
                  handleFormChange={this.handleFormChange}
                  handleNewItem = {this.handleNewItem}
                />
              }
            /> */}
            
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