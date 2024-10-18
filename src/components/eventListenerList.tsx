import { useState, useEffect } from "react";
import { Table, Heading, Spinner } from "@radix-ui/themes";
import { type MockRecord } from "../models/MockRecord";
import { fetchData } from "../util";
import { FloatingCounter } from "./floatingCounter";

const EventListenerList = () => {
    const [data, setData] = useState<MockRecord[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 12;

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

    const handleScroll = () => {
        if (
            document.body.scrollHeight - 300 <
            window.scrollY + window.innerHeight
        ) {

            setLoading(true);
            setCount(count => count + 1);
        }
    };

    window.addEventListener("scroll", handleScroll);

    return (
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
                </Table.Body>
            </Table.Root>

            <Spinner loading={loading} />

        </>
    );
};

export { EventListenerList };