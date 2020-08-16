import React from 'react';


const UserList = ( props ) => {


  const initialUsers = () => {

    console.log( 'inicializando estado' );

    return [
      {
        name: 'Nicole',
        lastname: 'Zambrano'
      },
      {
        name: 'Juanito',
        lastname: 'Perez'
      },
      {
        name: 'Susana',
        lastname: 'Muñoz'
      }
    ];
  };

  const [ users, setUsers ] = React.useState( initialUsers );

  const handleAddUser = () => {

    const name = document.querySelector( '#name' ).value;
    const lastname = document.querySelector( '#lastname' ).value;
    const newUser = {
      name,
      lastname
    };

    setUsers( ( prevState ) => [
      ...prevState,
      newUser
    ] );
  };
  return (
    <div>
      <div>
        <label htmlFor='name'>Nombre</label>
        <input type='text' id='name' />
        <label htmlFor='lastname'>Apellido</label>
        <input type='text' id='lastname' />

        <button onClick={ handleAddUser }>Agregar usuario</button>
      </div>

      <h1>Lista de usuarios ({ users.length } en total)</h1>

      <ul>
        {
          users.map( ( user, index ) => (
              <li key={ index }>{ user.name } { user.lastname }</li>
            )
          )
        }
      </ul>
    </div>
  );
};


export default UserList;