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
    <Card style={{ width: '300px', position: 'relative' }}>
      <Card.Body>
        <Card.Title>Todo List</Card.Title>
        <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
          {tasks.map((task, index) => (
            <li key={index} style={{ position: 'relative', paddingRight: '40px' }}>
              {task}
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeTask(index)}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
              >
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


