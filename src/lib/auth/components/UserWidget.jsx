import React from 'react'
import './styles.css';

const UserWidget = ({user}) => (
  <div className="UserWidget">
    { user && user.photoURL &&
      <img src={user.photoURL}/>
    }
    <div className="UserWidget__name">
      { user
        ? <a href={`mailto:${user.email}`}>{user.displayName}</a>
        : 'Who knows?'
      }
    </div>
  </div>
)

export { UserWidget }
