import React from "react";

type ButtonThrottleType = {
    func: (type: string) => void
}

export const ButtonFork: React.FC<ButtonThrottleType> = ({func}) => {
    return <div>
        <button onClick={() => func('ACTION-GET-POSTS-SIMPLE')}>ButtonFork</button>
    </div>
}