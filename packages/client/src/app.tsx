import * as React from 'react';
import Algorithm from './routes/algorithm/algorithm';
import DataStructure from './routes/dataStructure/dataStructure';
import Problem from './routes/problem/problem';
import ProblemDetail from './routes/problem/problemDetail';
import Vendor from './routes/vendor/vendor';

import { Header, SideBar, Container } from './layouts';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import './app.css';
import 'antd/dist/antd.css';


const App: React.FC = () => {

    const [isCollapsed, setCollapsed] = React.useState(false);
    const toggle = () => setCollapsed(!isCollapsed);
    return (
        <Router>
            <Layout>
                <SideBar collapsed={isCollapsed} />
                <Layout className="site-layout">
                    <Header collapsed={isCollapsed} onToggle={toggle} />
                    <Container>
                        <Switch>
                            <Route path="/problems/detail/:problem_id" component={ProblemDetail} />
                            <Route path="/data-structures" component={DataStructure} />
                            <Route path="/algorithms" component={Algorithm} />
                            <Route path="/vendors" component={Vendor} />
                            <Route path="/" component={Problem} />
                        </Switch>
                    </Container>
                </Layout>
            </Layout>
        </Router >
    );
};

export default App;
