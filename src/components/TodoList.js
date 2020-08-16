import React from 'react';


const TodoList = ( ) => {


  const [ todo, setTodo ] = React.useState([]);
  const [ complete, setComplete ] = React.useState([]);

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

  const handleDeleteTodo = (index) => {

    setTodo( ( prevState ) => {
      return prevState.filter( ( nameTodo, i ) => i !== index );
    } );
  };

  const handleCompleteTask = (index) => {

    setComplete( ( prevState ) => [
      ...prevState,
      todo[index]
    ] );

    handleDeleteTodo( index );
  };

  return (
    <div>
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
                <button onClick={ () => handleDeleteTodo(index) }>Eliminar</button>
                <button onClick={ () => handleCompleteTask(index) }>Completada</button>
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