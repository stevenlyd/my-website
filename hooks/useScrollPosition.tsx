import React, {useState, useEffect} from "react";

const useScrollPosition = (): number => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.scrollY);
        }
        window.addEventListener("scroll", updatePosition);
        updatePosition();
        return () => window.removeEventListener("scroll", updatePosition);
    }, []);

    return scrollPosition;
};

export default useScrollPosition;