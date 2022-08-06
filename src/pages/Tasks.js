import axios from 'axios';
import React, { useState } from 'react'

const Tasks = () => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("/task", { content })
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className='d-flex justify-content' onSubmit={handleSubmit}>
                <textarea 
                    maxLength="160"
                    className='form-control m-1'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder='Write something...' 
                />
                <button type='submit' className='btn btn-primary m-1'>
                    Submit
                </button>
            </form>
        </>
    )
}

export default Tasks