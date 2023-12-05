import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, isCompleted: false }]);
      setNewTask('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const totalTasks = tasks.length;

  return (
    <Card style={{ width: '300px', textAlign: 'left' }}>
      <Card.Body className="text-center">
        <Card.Title style={{ borderBottom: '2px solid #000', paddingBottom: '10px' }}>Todo List</Card.Title>
        <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                wordWrap: 'break-word',
              }}
            >
              <span style={{ marginRight: '5px' }}>{index + 1}.</span>
              <span
                style={{
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  marginRight: '5px',
                  maxWidth: '150px',
                  overflowWrap: 'break-word',
                  whiteSpace: 'normal',
                  alignText: 'left',
                }}
              >
                {task.text}
              </span>
              <div style={{ display: 'flex', alignItems:'flex-start', }}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleCompleted(index)}
                  style={{ width: '20px', height: '20px', marginRight: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  -
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeTask(index)}
                  style={{ width: '70px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  Remove
                </Button>
              </div>
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
              onKeyDown={handleKeyDown}
              style={{ width: '100%', marginRight: '5px' }}
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


