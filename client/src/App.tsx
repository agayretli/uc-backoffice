import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthService from './services/auth.service';

import Header from './components/general/header';
import Dashboard from './components/pages/dashboard';
import Login from './components/pages/login';
import Profile from './components/pages/profile';
import Users from './components/pages/users';

const App: FC = () => {
    const [isLogin, setLogin] = useState<boolean>(AuthService.checkSession());

    return (
        <Router>
            {!isLogin ? (
                <Login setLogin={setLogin} />
            ) : (
                <main className='d-flex'>
                    <div className='wrapper d-flex flex-column'>
                        <Header setLogin={setLogin} />
                        <div className='container-fluid'>
                            <Switch>
                                <Route exact path={['/']}>
                                    <Dashboard />
                                </Route>
                                <Route path='/profile'>
                                    <Profile />
                                </Route>
                                <Route path='/users'>
                                    <Users />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </main>
            )}
        </Router>
    );
};

export default App;
