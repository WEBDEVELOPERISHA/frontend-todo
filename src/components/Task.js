import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({ title: '', description: '', completed: false });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async () => {
        try {
            const response = await axios.post('/tasks', task);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async (id) => {
        try {
            const response = await axios.put(`/tasks/${ id }`, task); // Correct usage of template literal
            setTasks(tasks.map(t => t.id === id ? response.data : t));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/tasks/${ id }`); // Correct usage of template literal
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input type="text" placeholder="Title" onChange={e => setTask({ ...task, title: e.target.value })} />
            <input type="text" placeholder="Description" onChange={e => setTask({ ...task, description: e.target.value })} />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(t => (
                    <li key={t.id}>
                        {t.title} - {t.description}
                        <button onClick={() => updateTask(t.id)}>Update</button>
                        <button onClick={() => deleteTask(t.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Task;