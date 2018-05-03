import React from 'react'
import './styles.css';

const UserWidget = ({user}) => ( !user ? null : // TODO: ick
  <div className="UserWidget">
    <a href={`/users/${user.id}`} className="UserWidget__clickable">
      { user.photoURL &&
        <img src={user.photoURL}/>
      }
      <div className="UserWidget__name">
        <span>
          {user.displayName}
          <br/>
          {user.email}
        </span>
      </div>
    </a>
  </div>
)

const UserWidgets = ({users}) => (
  <div className="UserWidgets">
    <h1>
      { users.length } Players
      ({ users.length - users.filter(u=>!!u).length} null)
    </h1>
    { users.map((user, i) => (
        <div key={`user${i}`}>
          <UserWidget {...{user}}/>
        </div>
      ))
    }
  </div>
)

export { UserWidget, UserWidgets }
