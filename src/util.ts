import { MockRecord } from "./models/MockRecord";
import { mockData } from "./data/MockData";

const fetchData = async function (page: number, limit: number): Promise<MockRecord[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * limit;
            const end = start + limit;

            const paginatedData = mockData.slice(start, end);
            resolve(paginatedData);
        }, 1000);
    });
}

export { fetchData };