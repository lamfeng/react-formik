import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Nav, Alert } from '@/_components';
import { Home } from '@/home';
import { Users } from '@/users';
import { Demo1 } from '@/demo1';
import { Demo2 } from '@/demo2';
import { Demo3 } from '@/demo3';
import { Demo4 } from '@/demo4';

function App() {
    const { pathname } = useLocation();

    return (
        <div className="app-container">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path="/" component={Home} />
                    <Route path="/users" component={Users} />
                    <Route path="/demo1" component={Demo1} />
                    <Route path="/demo2" component={Demo2} />
                    <Route path="/demo3" component={Demo3} />
                    <Route path="/demo4" component={Demo4} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </div>
    );
}

export { App };