import * as React from 'react';
import { Button, Form, Input, Table } from 'antd';
import 'antd/dist/antd.css';

const Vendor: React.FC = () => {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const collumns = [{
        title: 'Vendor Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Vendor Url',
        dataIndex: 'url',
        key: 'url',
    }];
    const data = [{
        name: "Leet Code",
        url: "https://leetcode.com"
    }, {
        name: "Hacker Rank",
        url: "https://hackerrank.com"
    }, {
        name: "Codility",
        url: "https://codility.com"
    }];

    return <div>
        <Form {...layout} name="control-ref">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input name="name" placeholder="Name of the vendor" />
            </Form.Item>

            <Form.Item name="url" label="Url" rules={[{ required: true }]}>
                <Input name="url" placeholder="Url of the vendor" />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button htmlType="button">Reset</Button>
            </Form.Item>
        </Form>

        <h3>Vendors</h3>

        <Table columns={collumns} dataSource={data}>

        </Table>
    </div>;
};

export default Vendor;
