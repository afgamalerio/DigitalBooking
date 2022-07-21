import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route, useHistory
} from "react-router-dom";
import Home from '../pages/home';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Product from '../pages/product';
import Booking from '../pages/booking';
import SuccessfulBooking from '../pages/success';
import Administration from '../pages/administration';
import Bookings from '../pages/bookings';


const Router = () => {

    const admin = true;
    const user = true;
    const history = useHistory()

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/administration/success">
                    <SuccessfulBooking />
                </Route>

                {admin ?
                    <Route path="/administration">
                        <Administration />
                    </Route>
                    : history.push("/")}

                {user ?
                    <Route path="/:userid/bookings">
                        <Bookings />
                    </Route>
                    : history.push("/")}

                <Route path="/product/:id/booking/success">
                    <SuccessfulBooking />
                </Route>
                <Route path="/product/:id/booking">
                    <Booking />
                </Route>
                <Route path="/product/:id">
                    <Product />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;