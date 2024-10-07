import axios from 'axios'; // 导入 axios
import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
  const [tasks, setTasks] = useState([]); // 创建一个状态来存储任务

  useEffect(() => {
    // 使用 Axios 发起 GET 请求，获取任务列表
    axios.get('http://localhost:8080/api/tasks')
      .then(response => {
        setTasks(response.data); // 将获取到的数据设置到 tasks 状态中
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []); // 空依赖数组表示只在组件加载时执行一次

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
      </header>

      <div>
        <h2>Task List</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

