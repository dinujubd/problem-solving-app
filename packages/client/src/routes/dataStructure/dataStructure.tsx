import * as React from "react";
import { Button, Form, Input, Table } from "antd";
import axios, { AxiosResponse } from "axios";
import { DataStructure } from "shared/types";
import "antd/dist/antd.css";

const DataStructure: React.FC = () => {
  const [dataStructures, setDataStructures] = React.useState<
    Array<DataStructure>
  >([]);
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    },
  ];

  React.useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get<DataStructure[]>("http://localhost:8181/ds", {
        headers: headers,
      })
      .then((response) => {
        setDataStructures(response.data);
      });
  }, []);

  const onRowDelete = (id: any) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post<{ id: string }, AxiosResponse<Array<DataStructure>>>(
        "http://localhost:8181/ds/delete",
        { id: id },
        {
          headers: headers,
        }
      )
      .then((response) => {
        setDataStructures(response.data);
      });
  };
  const onFinish = (values: any) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post<DataStructure, AxiosResponse<Array<DataStructure>>>(
        "http://localhost:8181/ds",
        values,
        {
          headers: headers,
        }
      )
      .then((response) => {
        form.resetFields();
        setDataStructures(response.data);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input name="name" placeholder="Name of the Data Structure" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={onReset} htmlType="button">
            Reset
          </Button>
        </Form.Item>
      </Form>

      <h3>Data Structures</h3>

      <Table columns={columns} dataSource={dataStructures} rowKey="url" />
    </div>
  );
};

export default DataStructure;
