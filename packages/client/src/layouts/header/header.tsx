import * as React from 'react';
import { Layout } from 'antd';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

export const HeaderSection: React.FC<{ collapsed: boolean, onToggle: () => void }> = ({ collapsed, onToggle }) => {

    const { Header } = Layout;

    return <Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: onToggle,
        })}
    </Header>
}
