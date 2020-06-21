import * as React from 'react';
import { useHistory } from 'react-router-dom'
import { Table, Tag } from 'antd';
import 'antd/dist/antd.css';

const Problem: React.FC = () => {
    const history = useHistory();
    const columns = [
        {
            title: 'Problem Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            key: 'vendor',
        },
        {
            title: 'Algorithm',
            dataIndex: 'algorithm',
            key: 'algorithm',
            render: (tags: string[]) => (
                <>
                    {tags.map((tag) => {
                        return (
                            <Tag color={'geekblue'} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Data Structures',
            dataIndex: 'dataStructures',
            key: 'dataStructures',
            render: (tags: string[]) => (
                <>
                    {tags.map((tag) => {
                        return (
                            <Tag color={'geekblue'} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Space',
            dataIndex: 'space',
            key: 'space',
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            render: (tag: string) => {
                const colorMap: Record<string, string> = {
                    hard: 'error',
                    medium: 'warning',
                    easy: 'success',
                };
                return (
                    <Tag
                        onClick={(e) => {
                            e.stopPropagation();
                            alert(1);
                        }}
                        color={colorMap[tag]}
                        key={tag}
                    >
                        {tag.toUpperCase()}
                    </Tag>
                );
            },
        },
    ];

    const data = [
        {
            title: 'Three Sum',
            vendor: 'LeetCode',
            algorithm: ['BFS', 'DFS'],
            dataStructures: ['Stack', 'Array'],
            time: 'O(n)',
            space: 'O(1)',
            level: 'hard',
            comments: '',
            link: '',
            id: "1231-asdas2-asdad-asdad"
        },
        {
            title: 'Four Sum',
            vendor: 'Hacker Rank',
            algorithm: ['BFS', 'DFS'],
            dataStructures: ['Queue', 'Graph'],
            time: 'O(n)',
            space: 'O(1)',
            level: 'easy',
            comments: '',
            link: '',
            id: "rgfeg-asdas2-asdad-asdad"
        },
    ];

    return (
        <>
            <Table
                onRow={(record) => {
                    return {
                        onClick: () => {
                            history.push(`/problems/detail/${record.id}`)
                        },
                    };
                }}
                columns={columns}
                dataSource={data}
            />
        </>
    );
};

Problem.displayName = 'Problem';

export default Problem;
