import { useState, useEffect } from "react";

const IntersectionObserverList = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [loading]);

    return (
        <>
            intersection observer list
            {page}
        </>
    );
};

export { IntersectionObserverList };