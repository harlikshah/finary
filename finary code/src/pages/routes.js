import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//pages
import PortfolioPage from "./PortfolioPage";
import GroupPage from "./GroupPage";
import BrowseGroupsPage from "./BrowseGroupsPage";
import Page404 from "./404Page";
import ProfilePage from "./ProfilePage";
import EditProfilePage from "./EditProfilePage";
import StockPage from "./StockPage";
import OnBoardingPage from "./OnBoardingPage";
import LoginPage from "./LoginPage";
import RegisterAlpaca from "./RegisterAlpaca";
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/portfolio" />
      </Route>
      <Route exact path="/portfolio" component={PortfolioPage} />
      <Route exact path="/groups/:groupName" component={GroupPage} />
      <Route exact path="/groups/" component={BrowseGroupsPage} />
      <Route exact path="/profile/:username" component={ProfilePage} />
      <Route exact path="/profile/:username/edit" component={EditProfilePage} />
      <Route exact path="/stock/:stockSymbol" component={StockPage} />
      <Route exact path="/onboarding" component={OnBoardingPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/redirect" component={RegisterAlpaca} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/contact" component={ContactPage} />
      <Route component={Page404} />
    </Switch>
  );
};

export default Routes;
