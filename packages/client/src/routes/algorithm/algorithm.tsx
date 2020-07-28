import * as React from 'react';
import { Button, Form, Input, Table, Select, Tag } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import { FormButton } from '../../components/FormButton/FormButton.styled';

const Algorithm: React.FC = () => {

    const [algorithms, setAlgorithms] = React.useState([]);
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const algorithmTypes = [
        "Iterative",
        "Recursive",
        "Dynamic Programming",
        "Backtracking",
        "Divide and Conquer",
        "Greedy",
        "Brute Force",
        "Randomized",
        "Linear",
        "Probablistic",
        "Heurostic",
        "Search",
        "Sort",
        "Regex"
    ]

    const onRowDelete = (id: any) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        axios.post("http://localhost:8181/algorithms/delete", { id: id }, {
            headers: headers
        }).then((response) => {
           setAlgorithms(response.data)
        })
    }

    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: (tags: string[]) => {
            return tags && <div>
                {tags.map((tag) => {
                    return (
                        <Tag color={'geekblue'} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </div>
        }
    },
    {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (item: any) => {
            return (
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        onRowDelete(item.id);
                    }}
                >
                    Delete
                </a>
            );
        },
    }];


    React.useEffect(() => {
        const headers = {
            'Content-Type': 'application/json'
        }
        axios.get("http://localhost:8181/algorithms", {
            headers: headers
        }).then((response) => {
            setAlgorithms(response.data);
        })
    }, [])

    const onFinish = (values: any) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        axios.post("http://localhost:8181/algorithms", values, {
            headers: headers
        }).then((response) => {
            form.resetFields();
            setAlgorithms(response.data)
        })
    };

    const onReset = () => {
        form.resetFields();
    };

    return <div>
        <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input name="name" placeholder="Name of the Algorithm" />
            </Form.Item>
            <Form.Item name="tags" label="Tags">
                <Select
                    mode="tags"
                    placeholder="Please select"
                    defaultValue={[]}
                >
                    {algorithmTypes.map((item) => <Select.Option key={item} value={item}>{item}</Select.Option>)}

                </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <FormButton type="primary" htmlType="submit">Submit</FormButton >
                <FormButton onClick={onReset} htmlType="button">Reset</FormButton >
            </Form.Item>
        </Form>

        <h3>Algorithms</h3>

        <Table columns={columns} dataSource={algorithms} rowKey="url" />
    </div >;
};

export default Algorithm;
