import React, { component } from 'react';
import axios from 'axios'
class Register extends React.Component {    
     
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationError: ""
        }
       this.handleSubmitChange = this.handleSubmit.bind(this); 
       this.handleChange = this.handleChange.bind(this);     
    }
    handleChange(event) {
        console.log("handle Change", event); 
         this.setState({
             [event.target.name]: event.target.value
         })
    }
    handleSubmit(event) {
        console.log("form submitted");
        event.preventDefault();
    }
    
    render() {
      return (
        <div>
            
            <form onSubmit={this.handleSubmit} >
{/* // email  */}              
            <input type="email"  
                   name= "email" 
                   placeholder= "Email" 
                   value = {this.state.email} 
                   onChange={this.handleChange}
                   required 
                   />
{/* // password */}
            <input type="password"    
                   name= "password" 
                   placeholder= "Password" 
                   value = {this.state.password} 
                   onChange={this.handleChange}
                   required 
                   />
{/* //password_confirmation */}
            <input type="password"    
                   name= "password_confirmation" 
                   placeholder= "Password confirmation" 
                   value = {this.state.password_confirmation} 
                   onChange={this.handleChange}
                   required 
                   />
               <button type="submit">Register</button>
               
            </form>
        </div>
      )
    }
} 
export default Register
