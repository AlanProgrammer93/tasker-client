import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../context/task'
import dayjs from 'dayjs';
import { AuthContext } from '../../context/auth';
import axios from 'axios';
import useSearch from '../../hooks/useSearch';
import Timer from './Timer';
import SearchBar from '../forms/SearchBar';
import Masonry from 'react-masonry-css'

dayjs.extend(require("dayjs/plugin/relativeTime"));

const TaskList = () => {
    const [task, setTask] = useContext(TaskContext);
    const [auth, setAuth] = useContext(AuthContext);

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const { keyword, setKeyword, filteredTasks } = useSearch();

    useEffect(() => {
        getTotal()
    }, [])

    useEffect(() => {
        if (page === 1) return
        loadTasks()
    }, [page])

    const getTotal = async () => {
        try {
            const { data } = await axios.get("/task-count");
            setTotal(data)
        } catch (error) {
            console.log(error);
        }
    }

    const loadTasks = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/tasks/${page}`)
            setTask(prev => ({ ...prev, tasks: [...prev.tasks, ...data] }))
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (item) => {
        setTask({ ...task, selected: item });
    }

    return (
        <div className='container mt-2'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>

                    <SearchBar keyword={keyword} setKeyword={setKeyword} />

                    <pre
                        className='text-center'
                        style={{
                            textDecoration: 'underline gold',
                            textDecorationThickness: "3px"
                        }}
                    >
                        {task?.tasks.length} tasks
                    </pre>

                    <Masonry
                        breakpointCols={3}
                        className="my-masonry-grid"
                        columnClassName='my-masonry-grid_column'
                    >
                        {
                            filteredTasks.map((task) => (
                                <div
                                    key={task._id}
                                    style={{
                                        background: auth?.user?._id === task?.postedBy?._id ? "#f2ffe6" : "#ffe6e6"
                                    }}
                                    className="rounded shadow p-2 m-2 tasklist"
                                    onClick={() => handleClick(task)}
                                >
                                    <p>{task.task}</p>

                                    <p
                                        className='float-end'
                                        style={{ fontSize: "8px", marginTop: "-15px" }}
                                    >
                                        <Timer time={task.createdAt} /> by <b>{task?.postedBy?.name}</b>
                                        <b>{task?.postedBy?.name}</b>
                                    </p>
                                </div>
                            ))
                        }
                    </Masonry>

                    {
                        task?.tasks.length < total && (
                            <div className='text-center mt-4 mb-4'>
                                <button
                                    disabled={loading}
                                    className="btn btn-outline-warning"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setPage(page + 1)
                                    }}
                                >
                                    Load More
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskList