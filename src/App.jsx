import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import TrainerProfile from "./pages/trainer_profile";
import SearchPage from "./pages/search_page.jsx";
import AuthPage from "./pages/auth_page";
import HomePage from "./pages/home_page";
import Navbar from "./components/navbar";
import UserProfile from "./pages/user_profile";
import { ApolloProvider } from "@apollo/client";
import client from "./config/client";
import MyTrainers from "./pages/my_trainers";
import PaymentsPage from "./pages/payments_page";
import ProtectedRoute from "./components/auth/protected_route";
import PairingRequests from "./pages/pairing_requests";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router history={History}>
        <Navbar />
        <Switch>
          <Route exact path="/auth" component={AuthPage} />
          <ProtectedRoute>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/trainer/:id" component={TrainerProfile} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/yourTrainers" component={MyTrainers} />
            <Route exact path="/payments" component={PaymentsPage} />
            <Route exact path="/pairingRequests" component={PairingRequests} />
          </ProtectedRoute>
          {/* <Route exact path="/" */}

          {/* <Route exact path="/s" component={SearchPage} />
        <Route exact path="/tp" component={TrainerPage} />
        <Route exact path="/auth" component={AuthPage} /> */}
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
