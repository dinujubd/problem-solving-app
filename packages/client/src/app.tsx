import * as React from 'react';
import Algorithm from './routes/algorithm/algorithm';
import AlgorithmDetail from './routes/algorithm/algorithmDetail';
import DataStructure from './routes/dataStructure/dataStructure';
import DataStructureDetail from './routes/dataStructure/dataStructureDetail';
import Problem from './routes/problem/problem';
import ProblemDetail from './routes/problem/problemDetail';
import Vendor from './routes/vendor/vendor';
import VendorDetail from './routes/vendor/vendorDetail';

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
                            <Route path="/problems/detail" component={ProblemDetail} />
                            <Route path="/data-structures/detail" component={DataStructureDetail} />
                            <Route path="/data-structures" component={DataStructure} />
                            <Route path="/algorithms/detail" component={AlgorithmDetail} />
                            <Route path="/algorithms" component={Algorithm} />
                            <Route path="/vendors/detail" component={VendorDetail} />
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
