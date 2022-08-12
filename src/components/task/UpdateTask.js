import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'antd'
import { TaskContext } from '../../context/task'
import { AuthContext } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateTask = () => {
    const [task, setTask] = useContext(TaskContext);
    const [auth, setAuth] = useContext(AuthContext);

    const [content, setContent] = useState("");

    useEffect(() => {
        if (task) setContent(task?.selected?.task);
    }, [task]);

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.put(`/task/${task?.selected?._id}`, {
                task: content,
            })
            const newList = task.tasks.map(t => {
                if (t._id === data._id) {
                    return data
                }
                return t
            })
            setTask(prev => ({...prev, task: newList, selected: null}))
            toast.success("Task Updated!")
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (e) => {
        try {
            e.preventDefault();
            const {data} = await axios.delete(`/task/${task?.selected?._id}`)
            setTask(prev => ({
                ...prev, 
                tasks: prev.tasks.filter(task => task._id !== data._id), 
                selected: null
            }))
            toast.error("Task deleted!");
        } catch (error) {
            console.log(error);
        }
    }

    const canUpdateDelete = auth?.user?._id === task?.selected?.postedBy._id;

    return (
        <div>
            <Modal
                centered
                //title="This is modal"
                visible={task?.selected !== null}
                onCancel={() => setTask({ ...task, selected: null })}
                footer={null}
            >
                <form className='d-flex justify-content p-3'>
                    <textarea
                        maxLength="160"
                        className='form-control m-1'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder='Write something...'
                    />
                    {
                        canUpdateDelete ? (
                            <>
                                <button 
                                    onClick={handleUpdate}
                                    className='btn btn-primary m-1'
                                >
                                    Update
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    className='btn btn-danger m-1'
                                >
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button className='btn disabled m-1'>
                                By {task?.selected?.postedBy?.name}
                            </button>
                        )
                    }
                </form>
            </Modal>
        </div>
    )
}

export default UpdateTask