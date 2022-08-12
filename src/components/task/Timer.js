import React, { useEffect } from 'react'
import dayjs from 'dayjs'
dayjs.extend(require('dayjs/plugin/relativeTime'))

const Timer = ({time}) => {
    const [realtime, setRealtime] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            setRealtime(dayjs(time).add(1, "second").fromNow())
        }, 1000)

        return () => clearInterval(interval);
    }, [])

  return (
    <>{realtime}</>
  )
}

export default Timer