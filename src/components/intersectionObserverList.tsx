import { useState, useEffect, useRef } from "react";
import { Table, Heading, Spinner } from "@radix-ui/themes";
import { type MockRecord } from "../models/MockRecord";
import { fetchData } from "../util";
import { FloatingCounter } from "./floatingCounter";


const IntersectionObserverList = () => {
    const [data, setData] = useState<MockRecord[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 12;

    const loadNextRef = useRef<HTMLTableRowElement | null>(null);

    useEffect(() => {
        fetchData(page, limit).then((val) => setData(val));
    }, []);

    useEffect(() => {
        if (loading) {
            setPage((prevPage) => prevPage + 1);
            fetchData(page, limit).then((response) => {
                setData((prev) => [...prev, ...response]);
                setLoading(false);
            }
            );
        }
    }, [loading]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setLoading(true);
                        setCount(count => count + 1);
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the element is in view
        );

        if (loadNextRef.current) {
            observer.observe(loadNextRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);


    return (
        <>
            <>
                <FloatingCounter count={count} />
                <Heading>EventListener Demo</Heading>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map((data, index) => (
                            <Table.Row key={data.email + index}>
                                <Table.RowHeaderCell>{data.firstName}</Table.RowHeaderCell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.email}</Table.Cell>
                            </Table.Row>
                        ))}
                        <Table.Row ref={loadNextRef}></Table.Row>
                    </Table.Body>
                </Table.Root>

                <Spinner loading={loading} />

            </>
        </>
    );
};

export { IntersectionObserverList };