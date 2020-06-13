import * as React from 'react';
import { Layout } from 'antd';

export const Container: React.FC = ({ children }) => {

    const { Content } = Layout;
    return <Content
        className="site-layout-background"
        style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 60px)',
        }}
    >
        {children}
    </Content>
}