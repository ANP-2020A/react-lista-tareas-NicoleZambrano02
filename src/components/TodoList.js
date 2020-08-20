import React, { useState, useEffect } from 'react';
import '../styles/todo-list.css';


const TodoList = () => {

  const [ todo, setTodo ] = useState( [] );
  const [ complete, setComplete ] = useState( [] );
  const [ darkMode, setDarkMode ] = useState( false );
  const [ userInfo, setUserInfo ] = useState( null );
  const [ windowWidth, setWindowWidth ] = useState( window.innerWidth );


  useEffect( () => {
    const getData = async() => {
      const data = await fetch( 'https://jsonplaceholder.typicode.com/users/1' );
      const dataJson = await data.json();
      setUserInfo( dataJson );
      console.log( dataJson );
    };
    getData();
  }, [] );


  useEffect( () => {
    console.log( 'efecto', todo.length );
    if( todo.length > 0 ) {
      document.title = `${ todo.length } tareas pendientes`;
    } else {
      document.title = `No tienes tareas pendientes`;
    }
  }, [ todo ] );

  useEffect( () => {
    console.log( 'CAMBIO A ', darkMode
      ? 'DARK MODE'
      : 'LIGHT MODE' );
  }, [ darkMode ] );

  useEffect( () => {
    console.log( 'EL COMPONENTE SE MONTÓ' );

    window.addEventListener( 'resize', handleResize );

    return () => {
      console.log( 'EL COMPONENTE SE DESMONTÓ' );
      window.removeEventListener( 'resize', handleResize );
    };
  } );

  const handleAddTodo = () => {

    const nameTodo = document.querySelector( '#nameTodo' ).value;
    const newTodo = {
      nameTodo
    };

    setTodo( ( prevState ) => [
      ...prevState,
      newTodo
    ] );
  };

  const handleDeleteTodo = ( index ) => {

    setTodo( ( prevState ) => {
      return prevState.filter( ( nameTodo, i ) => i !== index );
    } );
  };

  const handleCompleteTask = ( index ) => {

    setComplete( ( prevState ) => [
      ...prevState,
      todo[ index ]
    ] );

    handleDeleteTodo( index );
  };

  const handleDarkMode = () => {
    setDarkMode( !darkMode );
  };

  const handleResize = () => {
    console.log( window.innerWidth );
    setWindowWidth( window.innerWidth );
  };

  return (
    <div className={ darkMode
      ? 'dark-mode'
      : '' }>

      <h1>El ancho de la ventana es: { windowWidth }</h1>

      <div>
        <h1>Lista de Usuarios</h1>
        <ul>
          <li>
          </li>
        </ul>
      </div>

      <button onClick={ handleDarkMode }>
        Cambiar a modo { darkMode
        ? 'claro'
        : 'oscuro' }
      </button>

      <div>
        <label htmlFor='nameTodo'>Nombre de la Tarea</label>
        <input type='text' id='nameTodo' />

        <button onClick={ handleAddTodo }>Agregar Tarea</button>
      </div>

      <h1>Lista de Tareas ({ todo.length } pendientes)</h1>

      <ul>
        {
          todo.map( ( todo, index ) => (
              <li key={ index }>
                { todo.nameTodo }
                <button onClick={ () => handleDeleteTodo( index ) }>Eliminar</button>
                <button onClick={ () => handleCompleteTask( index ) }>Completada</button>
              </li>

            )
          )
        }
      </ul>

      <h1>Lista de Tareas ({ complete.length } completadas)</h1>

      <ul>
        {
          complete.map( ( complete, index ) => (
              <li key={ index }>
                { complete.nameTodo }
              </li>

            )
          )
        }
      </ul>

    </div>
  );
};


export default TodoList;