import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';

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
    <Card style={{ width: '300px', textAlign: 'center' }}>
      <Card.Body>
        <Card.Title style={{ borderBottom: '2px solid #000', paddingBottom: '10px' }}>Todo List</Card.Title>
        <ul style={{ paddingLeft: '0', listStyle: 'none', textAlign: 'left' }}>
          {tasks.map((task, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <span style={{ display: 'inline-block', marginRight: '10px', width: '20px' }}>{index + 1}.</span>
              {task}
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeTask(index)}
                style={{ marginLeft: '10px' }}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
        <Form>
          <div style={{ borderTop: '1px solid #ccc', margin: '15px 0' }}></div>
          <Form.Group controlId="newTask">
            <Form.Control
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              style={{ width: '200px', display: 'inline-block', marginRight: '10px' }}
            />
          </Form.Group>
          <div style={{ margin: '15px 0' }}></div>
          <Button variant="primary" onClick={addTask}>
            Add Task
          </Button>
        </Form>
        <p className="mt-3">Total Tasks: {totalTasks}</p>
      </Card.Body>
    </Card>
  );
};

export default TodoList;


