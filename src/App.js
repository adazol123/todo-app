import React, {useEffect, useState} from 'react';
import './css/App.css';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Todo from './Todo';
import db from './API/firebase';
import firebase from 'firebase';
import adazolhubLogo from './Assets/Images/logo512.png'
import Footer from './Footer';



function App() {
  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiButton: {
        // Name of the rule
        text: {
          // Some CSS
          background: 'linear-gradient(to right, #283048 0%, #859398  51%, #283048  100%)',
          borderRadius: 10,
          border: 0,
          color: 'white',
          height: 48,
          width: 450,
          padding: '20px 60px 20px',
        },
      },

    },
  });


  

  
  const [todos, setTodos] = useState([]);
  const [input, setinput] = useState('');

  // when the app loads, we need to listen to the database and fetch new todos as theu get added/removed
  useEffect(() => {
    db.collection('todos').orderBy('timestampUpdated', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo.timestampUpdated})))
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  },[]);

  const addTodo = (event) => {
    event.preventDefault();
    
    db.collection('todos').add({
      todo: input,
      timestampCreated: firebase.firestore.FieldValue.serverTimestamp(),
      timestampUpdated: firebase.firestore.FieldValue.serverTimestamp()
    })

    // setTodos([...todos, input]);
    setinput('');
  }

  return (
    <>
    <div className="main">
      <div className="navigation-bar">
        <img src={adazolhubLogo} alt="" className="App-logo" />
        <h1>Adazolhub</h1>
      </div>
      <div className="App">
        <h1>Basic Todo App 🚀 </h1>
        <form className="main-form">

          <FormControl size="small" margin="dense" fullWidth="true" >
            <InputLabel>What's your plan today?</InputLabel>
            <Input value={input} onChange={event => setinput(event.target.value)}></Input>
          </FormControl>

          <ThemeProvider theme={theme}>
          <Button disabled={!input}
            
          type="submit" onClick={addTodo}>Add Todo</Button>
           </ThemeProvider>
        </form>
        

        <ul>
          {todos.map(todo  => (
            <Todo todo={todo}/>
            // <li>{todo}</li>
          ))}
        </ul>
      </div>
      <Footer/>
    </div>
    </>
  );
}

export default App;
