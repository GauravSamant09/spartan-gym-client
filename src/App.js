import React from 'react';
import { Container } from '@material-ui/core'
import Navbar from './compoenents/Navbar/Navbar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './compoenents/Home/Home';
import Auth from './compoenents/Auth/Auth';
import PostDetails from './compoenents/PostDetails/PostDetails'
import Member from './compoenents/Member/Member'
import Payment from './compoenents/Payment/Payment'
import Dashboard from './compoenents/Dashboard/Dashboard'

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    {/* <Route path="/" exact component={() => <Redirect to='/posts' />} />
                    <Route path="/posts" exact component={Home} /> */}
                    <Route path="/" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={PostDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />
                    {/*  new routes */}
                    <Route path="/members" exact component={Member} />
                    <Route path="/payments" exact component={Payment} />
                    <Route path="/dashboard" exact component={Dashboard} />

                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;