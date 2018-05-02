import React from 'react'

const UserWidget = ({user}) => (
  <div>
    { user && user.photoURL &&
      <img src={user.photoURL}/>
    }
    { user
      ? <a href={`mailto:${user.email}`}>{user.displayName}</a>
      : 'Who knows?'
    }
  </div>
)

export { UserWidget }
