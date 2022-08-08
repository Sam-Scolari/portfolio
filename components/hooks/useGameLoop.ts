import { useEffect, useRef } from "react";

export default function useGameLoop(callback, dependencies) {
    const requestID = useRef<any>();
    const previousTime = useRef<any>();

    function loop(time) {
        if (previousTime.current !== undefined) {
            const fps = Math.floor(1 / ((time - previousTime.current) / 1000));
            callback(time, fps);
        }
        previousTime.current = time;
        requestID.current = requestAnimationFrame(loop);
    }

    useEffect(()=> {
        requestID.current = requestAnimationFrame(loop);
        return ()=> cancelAnimationFrame(requestID.current);
    }, [dependencies])
}