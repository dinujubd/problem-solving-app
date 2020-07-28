import * as React from 'react';
import { Button, Form, Input, Table, Select, Tag, Row, Col } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import TextArea from 'antd/lib/input/TextArea';
import { Solution } from 'shared/types/solution';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormButton } from '../../components/FormButton/FormButton.styled';

const ProblemForm: React.FC = () => {
    const [form] = Form.useForm();
    const [solutions, setSolutions] = React.useState<Solution[]>([]);

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    };
    const tailLayout = {
        wrapperCol: { offset:6, span: 18 },
    };

    const onFinish = (values: any) => {
        const headers = {
            'Content-Type': 'application/json'
        }

        console.log(values)
        axios.post("http://localhost:8181/problems", values, {
            headers: headers
        }).then((response) => {
            form.resetFields();
        })
    };

    const onReset = () => {
        form.resetFields();
    };

    return <div>
        <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input placeholder="Title of the Propblem" />
            </Form.Item>
            <Form.Item
                name="vendor"
                label="Vendor">
                <Select
                    placeholder="Vendors"
                    defaultValue={[]}
                >
                    <option>LeetCode</option>
                </Select>
            </Form.Item>
            <Form.Item name="link" label="Link" rules={[{ required: true }]}>
                <Input placeholder="Link of the problem" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <TextArea placeholder="Description of the problem" />
            </Form.Item>

            <Form.List name="solutions">
                {(fields, { add, remove }) => (
                    <div>
                        {fields.map((field, i) => (
                            <div key={field.fieldKey}>
                                <Row>
                                    <Col span={6} offset={18}>
                                        <MinusCircleOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Form.Item
                                    name={[field.name, 'title']}
                                    fieldKey={[field.fieldKey, 'title']}
                                    label="Title">
                                    <Input placeholder="Title of the solution" />
                                </Form.Item>

                                <Form.Item
                                    name={[field.name, 'dataStructures']}
                                    fieldKey={[field.fieldKey, 'dataStructures']}
                                    label="Data Structures">
                                    <Select
                                        mode="tags"
                                        placeholder="Set Data Structures"
                                        defaultValue={[]}
                                    >

                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name={[field.name, 'algorithms']}
                                    fieldKey={[field.fieldKey, 'algorithms']}
                                    label="Algorithms">
                                    <Select
                                        mode="tags"
                                        placeholder="Set Algorithms"
                                        defaultValue={[]}
                                    >

                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name={[field.name, 'timeComplexity']}
                                    fieldKey={[field.fieldKey, 'timeComplexity']}
                                    label="Time Complexity">
                                    <Input placeholder="Time Complexity of the solution" />
                                </Form.Item>

                                <Form.Item
                                    name={[field.name, "spaceComplexity"]}
                                    fieldKey={[field.fieldKey, "spaceComplexity"]}
                                    label="Space Complexity">
                                    <Input placeholder="Space Complexity of the solution" />
                                </Form.Item>

                                <Form.Item
                                    name={[field.name, "level"]}
                                    fieldKey={[field.fieldKey, "level"]}
                                    label="Level">
                                    <Select
                                        mode="tags"
                                        placeholder="Set Level"
                                        defaultValue={["easy"]}
                                    >

                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name={[field.name, 'sourceCode']}
                                    fieldKey={[field.fieldKey, 'sourceCode']}
                                    label="Source Code">
                                    <TextArea placeholder="Paste your souce code" />
                                </Form.Item>
                                <Form.Item
                                    name={[field.name, 'comments']}
                                    fieldKey={[field.fieldKey, 'comments']}
                                    label="Comments">
                                    <TextArea placeholder="Put comments" />
                                </Form.Item>

                            </div>
                        ))}
                        <Form.Item>
                            <Row>
                                <Col span={4} offset={20}>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                    >
                                        <PlusOutlined />   Add Solution
                            </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </div>)}
            </Form.List>

            <Form.Item {...tailLayout}>
                <FormButton type="primary" htmlType="submit">Submit</FormButton >
                <FormButton onClick={onReset} htmlType="button">Reset</FormButton >
            </Form.Item>
        </Form>
    </div >;
};

export default ProblemForm;
