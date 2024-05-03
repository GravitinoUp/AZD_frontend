import { useState } from 'react'
import { TestButton } from '@/components/test-button'

const Counter = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <TestButton onClick={() => setCount(count + 1)}>{count}</TestButton>
        </div>
    )
}

export default Counter
