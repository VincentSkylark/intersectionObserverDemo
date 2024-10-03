import { useState, useEffect } from "react";

const EventListenerList = () => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [loading]);

    const handleScroll = () => {
        if (
            document.body.scrollHeight - 300 <
            window.scrollY + window.innerHeight
        ) {
            setLoading(true);
            setCount(count + 1);
        }
    };

    window.addEventListener("scroll", handleScroll);

    return (
        <>
            event listener list
            {<div>{page}</div>}
        </>
    );
};

export { EventListenerList };