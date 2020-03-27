# Online Cookbook-App
The purpose of the App is to provide users with a food networking platform where they can share and exchange creativities in cooking. 
The users will need to sign up and thereafter login into their accounts and then 
*	Browse the existing menu items and ingredients.
*	Create and add their own menu items and ingredients.
*	Modify the contents of their accounts
*	Delete their contents.
The App will be organized into different meal categories based on user preferences.:

## APP LAYOUT:
The App is divided into two functional groups:
1.	Frontend, and 
2.	Backend
## FRONTEND – Login\Sign Up



## Frontend Installation:

The Frontend will be a React JavaScript Application wth the following components. It creates the user interface of the App. It which makes POST requests to an API to add the App’s frontend entries from the user. It also makes GET, DELETE, etc. requests as needed

We will create a project directory
```js
mkdir <folder-nmae> 
cd <folder-name>
Install create-react-app <app-name>
```
We will use the command: create-react-app to create a starter React app.globbally
```js
npm i create-react-app -g
```
The above command creates a new directory and installs most of the dependencies required for the React starter app. 
After it's finished installing, the second command changes to the project directory.
We will use the followin command to create a json file:
```js
nmp init
```
start vscode or whatever Editor of preference by giving in the following command:
```js
code .
```
Now we will enter the following command to start the REACT Application in a browser
```js
npm start
```
Instalingl axios
Axios is an API that we will use to send requests from the frontend (REACT) to the backend.
```js
npm i axios --save
```
NODE JS:
NodeJS Needs to be installed and running for the frontend.
We will first check for the presence of Node JS by entering the following command in the terminal
```
node -v
```
If node is installed, this will return the version otherwise, we have to download node and install it.
CREATE THE APP:
The cookbok front ent application wll be created in the new folder created above with the command:
```js
npx react-create-app cookbook
```

Frontend Components

 
LOGIN
```js
import React from 'react';

export default function Login(props) {
  return (
    <div>
      <form
        onSubmit={props.handleSubmit}
        onChange={props.handleFormChange}
      >
        <input
          type='text'
          name='currentUser'
          placeholder='your email address'
        />
        <input
          type='submit'
        />
      </form>
    </div>
  )
}
```

The login screen will act as a container to toggle between login and registration. Only signed up users will be able to login.

### User.js
```js
import React from 'react';

export default function User(props) {
  const userDetail = props.users
    .find(user => user._id === props.match.params.id)
  return (
    <div className='userDetail'>
      <h2>
        first name: {userDetail.firstName}
      </h2>
      <h2>
        last name: {userDetail.lastName}
      </h2>
      <p>change your account information here, if necessary:</p>
      <form className='put user name change'
        onSubmit={props.handlePutUser}
        onChange={props.handleFormChange}
        id={userDetail._id}
      >
        <input
          type='text'
          name='newFirstName'
          defaultValue={userDetail.firstName}
        />
        first name<p></p>
        <input
          type='text'
          name='newLastName'
          defaultValue={userDetail.lastName}
        />
        last name<p></p>
        <input
          type='text'
          name="newEmail"
          defaultValue={userDetail.email}
        />
        email address<p></p>
        <input
          type='submit'
        />
        <button className='delete user'
          id={userDetail._id}
          onClick={props.handleDelete}
        >
          Delete
        </button>
      </form>
    </div>
  )
}
```

The user component will be used to sign up new users. The user fills in first name, last name email address and password. This information will then be captured, and sent to the backend on clicking the submit button which is executed by handleClick function and stored in the backend of the app. This information will be used for the login.

### NewRecipes
```js
import React from 'react';

export default function NewRecipe(props) {
  return (
    <div >
      <form
        onSubmit={props.handleNewRecipe}
        onChange={props.handleFormChange}
      >
        <input type="text" name="newRecipeName" placeholder="recipe name" />
        <p></p>
        <input type="text" name="newMainProtein" placeholder="main protein" />
        <p></p>
        <input type="Submit" />
      </form>
    </div>
  )
}
```

The New Recipe component will be used to post new recipes by logged in users. The user fills the name of their recipe, add the protein type and ingredients of preference. This information will then be captured, and sent to the backend on clicking the submit button which is executed by the appropriate event handlers and stored in the backend of the app. 

### Recipe Details
```js
import React from 'react';

export default function RecipeDetails (props) {
  const recipeDetail = props.recipes.find(recipe => 
    recipe._id === props.match.params.recipeId
  )
  if (props.currentUser === recipeDetail.submittedBy || !recipeDetail.submittedBy) {
    const ingredients = recipeDetail.ingredients.map (ingredient => {
      return (
        <li key={ingredient._id}>
          {ingredient.item}
          <button
            id = {recipeDetail._id}
            onClick = {props.deleteItem}
          >
            del
          </button>
        </li>
      )
    })
    return (
      <div>
        <form
          onSubmit={props.handleUpdateRecipe}
          onChange={props.handleFormChange}
          id={recipeDetail._id}
          data-protein-id={recipeDetail.mainProtein}
        >
          Name: <input type="text" name="newRecipeName" defaultValue={recipeDetail.name} />
          <p></p>
          {/* Main Protein: <input type="text" name="newMainProtein" defaultValue={recipeDetail.mainProtein} /> */}
          Main Protein: {recipeDetail.mainProtein}
          <p></p>
          <ul>
            List of Ingredients:
            {ingredients}
          </ul>
          <p></p>
          Directions: <textarea name="newDirections" rows='10' columns='100' placeholder='Enter directions here...' defaultValue={recipeDetail.directions}></textarea> 
          <p></p>
          <input type="Submit" />
          <p></p>
        </form>
        <form
          onSubmit={props.postNewIngredient}
          onChange={props.handleFormChange}
          id={recipeDetail._id}
        >
          <input type="text" name="newIngredient" placeholder="add ingredient w/amount (ex: 1Cup brown sugar)" size='42'/>
          <input type='submit' value='Add New Ingredient'/>
        </form>
        <p></p>
        <button 
          id={recipeDetail._id}
          onClick={props.handleDelete}
        >
          Delete Recipe
        </button>
        <p>
          submitted by: {recipeDetail.submittedBy}
        </p>
      </div>
    )
  } else {
    const ingredients = recipeDetail.ingredients.map (ingredient => {
      return (
        <li key={ingredient._id}>
          {ingredient.item}
        </li>
      )
    })
    return (
      <div>
        <h2>
          Name: {recipeDetail.name}
        </h2>
        <h3>
          Main Protein: {recipeDetail.mainProtein}
        </h3>
        <ul>
          List of Ingredients
          {ingredients}
        </ul>
        <h3>
          Directions: {recipeDetail.directions}
        </h3>
        <p>
          submitted by: {recipeDetail.submittedBy}
        </p>
      </div>
    )
  }
}
```

The Recipe details component will display the recipes as created by the users and also the user’s personal information such as name and email address

### APP.JS
```js
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

const apiURL = process.env.REACT_APP_BACKEND_APP_URL || 'http://localhost:8080/api'

export default withRouter(class App extends Component {
  constructor(props) {
    super()
    this.state = {
      recipes: [],
      chapters: [],
      users: [],
      user_id: '',
      newIngredients: []
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
  postRecipe = (e) => {
    e.preventDefault()
    axios({
      method: "POST",
      url: `${apiURL}/recipes`,
      data: {
        name: this.state.newRecipeName,
        mainProtein: this.state.newMainProtein,
        submittedBy: this.state.currentUser
      }
    })
    .then(newRecipe => {
      this.setState(prevState => (
        {
          recipes: [...prevState.recipes, newRecipe.data]
        }
      ))
      this.props.history.push(`/chapters/${newRecipe.data.mainProtein}/${newRecipe.data._id}`);
    })
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
  putRecipe = (e) => {
    e.preventDefault()
    let proteinId = e.target.getAttribute('data-protein-id')
    let recipeId = e.target.id
    axios({
      method: "PUT",
      url: `${apiURL}/recipes/${e.target.id}`,
      data: {
        name: this.state.newRecipeName,
        directions: this.state.newDirections,
        ingredients: this.state.newIngredients
      }
    }).then(res => {
      this.setState(
        {
          recipes: res.data
        }
      )
      this.props.history.push(`/chapters/${proteinId}/${recipeId}`)
    });
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
    } if (this.state.newLastName) {
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
    } if (this.state.newEmail) {
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
              exact path='/user'
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
                  currentUser={this.state.currentUser}
                  handleUpdateRecipe={this.putRecipe}
                  handleFormChange={this.handleFormChange}
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
                () => <Redirect to='/user' />
              }
            />
          </Switch>
        </main>
      </div>
    )
  }
})
```

App.JS will handle the API calls and even the rendering of the App. All state of the application will be handled from here.
