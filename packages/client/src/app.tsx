import * as React from 'react';

import { useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Problem from './routes/problem/problem';
import ProblemDetail from './routes/problem/problemDetail';
import DataStructure from './routes/dataStructure/dataStructure';
import DataStructureDetail from './routes/dataStructure/dataStructureDetail';
import Algorithm from './routes/algorithm/algorithm';
import AlgorithmDetail from './routes/algorithm/algorithmDetail';
import Vendor from './routes/vendor/vendor';
import VendorDetail from './routes/vendor/vendorDetail';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CodeOutlined,
    BarChartOutlined,
    SlidersOutlined,
    HddOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import './app.css';

const App: React.FC = () => {
    const { Header, Sider, Content } = Layout;

    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed(!collapsed);

    const getRoute = () => {
        const routeSections = window.location.href.split('/');

        return routeSections.length > 0 ? routeSections[routeSections.length - 1] : 'problems';
    };

    return (
        <Router>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
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
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 'calc(100vh - 60px)',
                        }}
                    >
                        <Switch>
                            <Route path="/problems/detail" component={ProblemDetail} />
                            <Route path="/data-structures/detail" component={DataStructureDetail} />
                            <Route path="/data-structures" component={DataStructure} />
                            <Route path="/algorithms/detail" component={AlgorithmDetail} />
                            <Route path="/algorithms" component={Algorithm} />
                            <Route path="/vendors/detail" component={VendorDetail} />
                            <Route path="/vendors" component={Vendor} />
                            <Route path="/" component={Problem} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;
