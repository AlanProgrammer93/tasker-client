import axios from 'axios';
import React, { useContext, useState } from 'react'
import { TaskContext } from '../../context/task';
import socket from '../../socket';

const CreateTask = () => {
    const [content, setContent] = useState("");
    const [task, setTask] = useContext(TaskContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("/task", { content })
            setTask({...task, tasks: [data, ...task.tasks]})
            setContent("");

            socket.emit("new-task", data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <form className='d-flex justify-content' onSubmit={handleSubmit}>
                        <textarea 
                            maxLength="160"
                            className='form-control m-1'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder='Write something...' 
                        />
                        <button type='submit' className='btn btn-warning m-1'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTask