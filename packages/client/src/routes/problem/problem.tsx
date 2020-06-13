import * as React from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Space, Modal } from 'antd';

const Problem: React.FC = () => {
    const [modalState, setModalState] = useState<{ isVisible: boolean; data: any }>({ isVisible: false, data: {} });

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
        },
    ];

    const DynamicModal: React.FC<{ isVisible: boolean; data: any }> = ({ isVisible, data }) => (
        <Modal onCancel={() => setModalState({ data: {}, isVisible: false })} title="Basic Modal" visible={isVisible}>
            <p>{data.title}</p>
            <p>{data.level}</p>
        </Modal>
    );

    return (
        <>
            <DynamicModal {...modalState} />
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setModalState({ ...modalState, data: record, isVisible: true });
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
