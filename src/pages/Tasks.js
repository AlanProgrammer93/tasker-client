import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import CreateTask from '../components/task/CreateTask';
import TaskList from '../components/task/TaskList';
import UpdateTask from '../components/task/UpdateTask';
import { TaskContext } from '../context/task';
import socket from '../socket';

const Tasks = () => {
    const [task, setTask] = useContext(TaskContext);

    useEffect(() => {
        loadTasks();
    }, [])

    useEffect(() => {
        socket.on("new-task", task => {
            setTask(prev => ({ ...prev, tasks: [task, ...prev.tasks] }))
        })

        return () => socket.off("new-task")
    }, [])

    const loadTasks = async () => {
        try {
            const { data } = await axios.get("/tasks/1");
            //setTasks(data);
            setTask({ ...task, tasks: data })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <CreateTask />
            <TaskList />
            <UpdateTask />
        </>
    )
}

export default Tasks