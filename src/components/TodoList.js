import React, { useState, useEffect } from 'react';
import '../styles/todo-list.css';


const TodoList = () => {

  const [ todo, setTodo ] = useState( [] );
  const [ complete, setComplete ] = useState( [] );
  const [ id, setId ] = useState( 1 );
  const [ darkMode, setDarkMode ] = useState( false );
  const [ userInfo, setUserInfo ] = useState( null );

  const [ windowWidth, setWindowWidth ] = useState( window.innerWidth );


  useEffect( () => {
    const getData = async() => {
      const data = await fetch( `https://jsonplaceholder.typicode.com/users/${ id }` );
      const dataJson = await data.json();
      setUserInfo( dataJson );
      console.log( dataJson );
    };
    getData();

    const getTodos = async() => {
      const data = await fetch( `https://jsonplaceholder.typicode.com/users/${ id }/todos` );
      const dataJson = await data.json();
      setTodo( dataJson );
    };
    getTodos();
  }, [ id ] );


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

    const title = document.querySelector( '#nameTodo' ).value;

    setTodo( ( prevState ) => [
      ...prevState,{
        title
      }
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
      todo[ index ].completed = true
    ] );
  };

  const handleDarkMode = () => {
    setDarkMode( !darkMode );
  };

  const handleResize = () => {
    console.log( window.innerWidth );
    setWindowWidth( window.innerWidth );
  };

  const handleNextUser = () => {
    setId( id + 1 );
  };

  const handlePrevUser = () => {
    setId( id - 1 );
  };

  return (
    <div className={ darkMode
      ? 'dark-mode'
      : '' }>

      {
        id > 1 &&
        <button onClick={ handlePrevUser }>Anterior usuario</button>
      }
      {
        id < 10 &&
        <button onClick={ handleNextUser }>Siguiente usuario</button>
      }

      {
        userInfo
          ?
          <>
            <h1>Información del usuario</h1>
            <ul>
              <li><strong>Nombre: </strong> { userInfo.name }</li>
              <li><strong>Usuario: </strong> { userInfo.username }</li>
              <li><strong>Email: </strong> { userInfo.email }</li>
              <li><strong>Web: </strong> { userInfo.website }</li>
              <li><strong>Teléfono: </strong> { userInfo.phone }</li>
            </ul>
          </>
          : 'Cargando...'
      }

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

      <h1>Lista de tareas ({ todo.length } en total)</h1>

      {
        todo.map( ( todo, index ) => (

            <tr key={ index }>
                <td>{ todo.title }</td>
                <td>
                  {
                    todo.completed
                      ? <button className='completed'>Completada</button>
                      : <button className='noComplete' onClick={ () => handleCompleteTask( index ) }>Marcar como
                        completada</button>
                  }
                </td>
                <td>
                  <button onClick={ () => handleDeleteTodo( index ) }>Eliminar</button>
                </td>
            </tr>

          )
        )

      }

    </div>
  );
};


export default TodoList;