import * as React from 'react';
import { useHistory } from 'react-router-dom'
import { Table, Tag, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import { Problem as ProblemType } from 'shared/types';
import axios from "axios";

const Problem: React.FC = () => {
    const history = useHistory();
    const [problems, setProblems] = React.useState();
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
                        {tag && tag.toUpperCase()}
                    </Tag>
                );
            },
        },
    ];


    React.useEffect(() => {
        const headers = {
            'Content-Type': 'application/json'
        }
        axios.get("http://localhost:8181/problems", {
            headers: headers
        }).then((response) => {
            setProblems(response.data);
        })
    }, [])




    const data = [
        {
            title: 'Three Sum',
            vendor: 'LeetCode',
            algorithms: ['BFS', 'DFS'],
            dataStructures: ['Stack', 'Array'],
            timeComplexit: 'O(n)',
            space: 'O(1)',
            level: 'hard',
            comments: '',
            link: '',
            id: "1231-asdas2-asdad-asdad"
        },
        {
            title: 'Four Sum',
            vendor: 'Hacker Rank',
            algorithms: ['BFS', 'DFS'],
            dataStructures: ['Queue', 'Graph'],
            time: 'O(n)',
            space: 'O(1)',
            level: 'easy',
            comments: '',
            link: '',
            id: "rgfeg-asdas2-asdad-asdad"
        },
    ];




    const onCreateNewBtnClickHandler = () => {

        history.push('/problems/create');
    }

    return (
        <>
            <Row>
                <Col offset={21} span={3}><Button onClick={onCreateNewBtnClickHandler}>Create New</Button></Col>
            </Row>
            <Table
                onRow={(record) => {
                    return {
                        onClick: () => {
                            history.push(`/problems/detail/${record.id}`)
                        },
                    };
                }}
                columns={columns}
                dataSource={problems}
            />
        </>
    );
};

Problem.displayName = 'Problem';

export default Problem;
