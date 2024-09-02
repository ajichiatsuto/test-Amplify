import logo from './logo.svg';
import './App.css';

import {Amplify} from 'aws-amplify';
import awsmobile from './aws-exports';

import {useState} from 'react';
import {generateClient} from 'aws-amplify/api';
import {createTodo} from './graphql/mutations';
import {listTodos} from './graphql/queries';

Amplify.configure(awsmobile);



const API = generateClient();
function App() {
  const [TodoList, setTodoList] = useState([]);

  const setTodo = async() => {
    await API.graphql({
      query: createTodo,
      variables: {
        input: {
          name: "todo",
          description: "description"
        }
      }
    });
  }

  const getTodo = async() => {
    const result = await API.graphql({
      query: listTodos
    });
    setTodoList(result.data.listTodos.items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={setTodo}>Set Todo</button>
        <button onClick={getTodo}>Get Todo</button>
        <ul>
          {TodoList.map((todo, index) => <li key={index}>{todo.name}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
