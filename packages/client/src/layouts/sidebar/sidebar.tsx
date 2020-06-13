import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    CodeOutlined,
    BarChartOutlined,
    SlidersOutlined,
    HddOutlined,
} from '@ant-design/icons';


export const SideBar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {

    const { Sider } = Layout;

    const getRoute = () => {
        const routeSections = window.location.href.split('/');

        return routeSections.length > 0 ? routeSections[routeSections.length - 1] : 'problems';
    };


    return <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[getRoute()]}>
            <Menu.Item key="problems" icon={<CodeOutlined />}>
                <Link to="/">Problems</Link>
            </Menu.Item>
            <Menu.Item key="data-structures" icon={<SlidersOutlined />}>
                <Link to="/data-structures">Data Structures</Link>
            </Menu.Item>
            <Menu.Item key="algorithms" icon={<BarChartOutlined />}>
                <Link to="/algorithms">Algorithms</Link>
            </Menu.Item>
            <Menu.Item key="vendors" icon={<HddOutlined />}>
                <Link to="/vendors">Vendors</Link>
            </Menu.Item>
        </Menu>
    </Sider>
}