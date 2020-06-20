import * as React from 'react';
import { Button, Form, Input, Table } from 'antd';
import axios from 'axios'
import 'antd/dist/antd.css';

const Vendor: React.FC = () => {

    const [vendorData, setVendorData] = React.useState([]);
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
        axios.post("http://localhost:8181/vendor/delete", { id: id }, {
            headers: headers
        }).then((response) => {
            setVendorData(response.data)
        })
    }

    const collumns = [{
        title: 'Vendor Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Vendor Url',
        dataIndex: 'url',
        key: 'url',
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
        axios.get("http://localhost:8181/vendors", {
            headers: headers
        }).then((response) => {
            setVendorData(response.data);
        })
    }, [])

    const onFinish = (values: any) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        axios.post("http://localhost:8181/vendors", values, {
            headers: headers
        }).then((response) => {
            form.resetFields();
            setVendorData(response.data)
        })
    };

    const onReset = () => {
        form.resetFields();
    };

    return <div>
        <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input name="name" placeholder="Name of the vendor" />
            </Form.Item>

            <Form.Item name="url" label="Url" rules={[{ required: true }]}>
                <Input name="url" placeholder="Url of the vendor" />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button onClick={onReset} htmlType="button">Reset</Button>
            </Form.Item>
        </Form>

        <h3>Vendors</h3>

        <Table columns={collumns} dataSource={vendorData} rowKey="url" />
    </div >;
};

export default Vendor;
