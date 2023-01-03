import React from 'react'

type ButtonThrottleType = {
    func: (type: string) => void
}

export const ButtonThrottle: React.FC<ButtonThrottleType> = ({func}) => {
    return <div>
        <button onClick={() => func('ACTION-GET-POSTS-THROTTLE')}>ClickThro</button>
    </div>
}