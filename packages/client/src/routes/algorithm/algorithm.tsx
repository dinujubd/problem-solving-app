import * as React from 'react';
import { Button, Form, Input, Table } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

const Algorithm: React.FC = () => {

    const [algorithms, setAlgorithms] = React.useState([]);
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

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
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (item: any) => {
            return <a onClick={(e) => { e.preventDefault(); onRowDelete(item.id) }}>Delete</a>
        }
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
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button onClick={onReset} htmlType="button">Reset</Button>
            </Form.Item>
        </Form>

        <h3>Algorithms</h3>

        <Table columns={columns} dataSource={algorithms} rowKey="url" />
    </div >;
};

export default Algorithm;
