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