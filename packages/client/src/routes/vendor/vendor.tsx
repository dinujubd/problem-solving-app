import * as React from 'react';
import { Button, Form, Input, Table } from 'antd';
import 'antd/dist/antd.css';
import { Vendor as VendorType } from 'shared/types';
import { httpClient } from '../../service/httpClient'

const Vendor: React.FC = () => {

    const [vendorData, setVendorData] = React.useState<VendorType[]>([]);
    const [form] = Form.useForm();

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
        httpClient.req<VendorType[]>("VENDOR:GET", null, ((vendors: VendorType[]) => {
            setVendorData(vendors);
        }));
    }, [])

    const onRowDelete = React.useCallback((id: any) => {
        httpClient.req<any>("VENDOR:DELETE",id,(vendors:VendorType[])=>{
            setVendorData(vendors)
        })
    },[vendorData]);
    const onFinish = React.useCallback((values: any) => {
        httpClient.req<VendorType[]>("VENDOR:POST", values, ((response: VendorType[]) => {
            setVendorData(response);
            form.resetFields();
        }));
    },[vendorData]);

    const onReset = React.useCallback(() => {
        form.resetFields();
    },[form]);

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
