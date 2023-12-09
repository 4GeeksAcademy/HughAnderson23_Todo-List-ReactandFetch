import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    createUserIfNeeded();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/HughAnderson23');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createUserIfNeeded = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/user/HughAnderson23');
      if (!response.ok) {
        const createUserResponse = await fetch('https://playground.4geeks.com/apis/fake/user/HughAnderson23', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (!createUserResponse.ok) {
          throw new Error('Failed to create user');
        }
      }
    } catch (error) {
      console.error('Error checking/creating user:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        

        const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/HughAnderson23');
        const existingTasks = await response.json();

        let method = 'POST';

        if (Array.isArray(existingTasks) && existingTasks.length > 0) {
          method = 'PUT';
        }

        const updateResponse = await fetch('https://playground.4geeks.com/apis/fake/todos/user/HughAnderson23', {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([...existingTasks, { label: newTask, done: false }]),
        });

        if (updateResponse.ok) {
          fetchTasks();
          setNewTask('');
        } else {
          console.error('Failed to add or update task');
        }
      } catch (error) {
        console.error('Error adding or updating task:', error);
      }
    }
  };

  const clearList = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/HughAnderson23', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // List cleared successfully, fetch updated tasks (empty list)
        fetchTasks();
      } else {
        console.error('Failed to clear list');
      }
    } catch (error) {
      console.error('Error clearing list:', error);
    }
  };

  const toggleCompleted = async (index) => {
    let updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;

    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/HughAnderson23', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTasks),
      });

      if (response.ok) {
        // Task updated successfully, fetch updated tasks
        fetchTasks();
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const removeTask = async (index) => {
    let updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);

    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/HughAnderson23', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTasks),
      });

      if (response.ok) {
        // Task deleted successfully, fetch updated tasks
        fetchTasks();
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  };

  const totalTasks = tasks.length;

  return (
    <Card style={{ width: '300px' }}>
      <Card.Body className="text-center">
        <Card.Title style={{ borderBottom: '2px solid #000', paddingBottom: '10px' }}>To-do List</Card.Title>
        <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
          {tasks?.map((task, index) => (
            <li
              key={index}
              style={{
                marginBottom: '10px',
                display: 'flex',
                wordWrap: 'break-word',
                position: 'relative',
              }}
            >
              <span style={{ marginRight: '5px' }}>{index + 1}.</span>
              <span
                style={{
                  textDecoration: task.done ? 'line-through' : 'none',
                  marginRight: '5px',
                  maxWidth: '150px',
                  overflowWrap: 'break-word',
                  whiteSpace: 'normal',
                  textAlign: 'left',
                }}
              >
                {task.label}
              </span>
              <div
                style={{
                  position: 'absolute',
                  right: '0',
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => toggleCompleted(index)}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ✓
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeTask(index)}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginLeft: '3px',  // Adjusted margin to align with the green button
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  🚫
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
          <Button variant="danger" onClick={clearList} style={{ marginLeft: '10px' }}>
            Clear Tasks
          </Button>
        </Form>
        <p className="mt-3">Total Tasks: {totalTasks}</p>
      </Card.Body>
    </Card>
  );
};

export default TodoList;


