import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form } from 'react-bootstrap';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const totalTasks = tasks.length;

  return (
    <Card>
      <Card.Body>
        <Card.Title>Todo List</Card.Title>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <Button variant="danger" size="sm" onClick={() => removeTask(index)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
        <Form>
          <Form.Group controlId="newTask">
            <Form.Control
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={addTask}>
            Add Task
          </Button>
        </Form>
        <p>Total Tasks: {totalTasks}</p>
      </Card.Body>
    </Card>
  );
};

export default TodoList;
