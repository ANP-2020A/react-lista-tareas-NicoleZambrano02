import React from 'react';
import '../styles/App.css';
import UserList from './UserList';
import TodoList from './TodoList';

const App = ( props ) => {

  return <>
    <UserList users={ props.users } />
    <TodoList />
  </>;


};

export default App;