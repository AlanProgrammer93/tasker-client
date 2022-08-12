import { useContext, useState } from 'react'
import { TaskContext } from '../context/task';

export default function useSearch () {
    const [keyword, setKeyword] = useState("")
    const [task, setTask] = useContext(TaskContext);

    const filteredTasks = task?.tasks?.filter(t =>
        t.task.toLowerCase().includes(keyword)
    )

    return { keyword, setKeyword, filteredTasks }
}