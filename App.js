import CategoryInterface from "./Component/CategoryInterface"
import DisplayAllCategory from './Component/DisplayAllCategories'
import AdminLogin from "./Component/AdminLogin";
import AdminDashBoard from "./Component/AdminDashBoard";
import SubCategoryInterface from "./Component/SubCategoryInterface"
import DisplayAllSubcategory from './Component/DisplayAllSubcategories'
import AccessoriesInterface from "./Component/AccessoriesInterface"
import DisplayAllAccessories from "./Component/DisplayAllAccessories"
import DisplayAllGames from "./Component/DisplayAllGames"
import GamesInterface from "./Component/GamesInterface"
import {BrowserRouter as Router,Route} from "react-router-dom"
import Header from "./Component/ClientView/Header"
import ConsoleList from "./Component/ClientView/ConsoleList"
import Home from "./Component/ClientView/Home"
import ProductView from "./Component/ClientView/ProductView"
import Footer from "./Component/ClientView/Footer"
import QtySpinner from "./Component/ClientView/QtySpinner";
import Termsandcondition from "./Component/Termsandcondition";
import Documents from "./Component/Documents";
import AccessoriesPicture from "./Component/AccessoriesPicture";
import ConsolePicture from "./Component/ConsolePicture";
import ShowCart from "./Component/ClientView/ShowCart";
import GamesPicture from "./Component/GamesPicture";
import MobileRegistration from "./Component/ClientView/MobileRegistration";
import SignUpForm from "./Component/ClientView/SignUpForm";
import PaymentGateWay from "./Component/ClientView/PaymentGateWay";


function App (props) {
  return (
    <div>
      <Router>
        <Route
           strict
           exact
           component={CategoryInterface}
           path="/categoryinterface"
           history={props.history}
        ></Route>
            
         <Route
           strict
           exact
           component={DisplayAllCategory}
           path="/displayallcategory"
           history={props.history}
        ></Route>
          
          <Route
           strict
           exact
           component={SubCategoryInterface}
           path="/subcategoryinterface"
           history={props.history}
        ></Route>
          
          <Route
           strict
           exact
           component={DisplayAllSubcategory}
           path="/displayallsubcategory"
           history={props.history}
        ></Route>

         <Route
           strict
           exact
           component={AdminLogin}
           path="/adminlogin"
           history={props.history}
        ></Route>

         <Route
           strict
           exact
           component={AdminDashBoard}
           path="/admindashboard"
           history={props.history}
         ></Route>

        <Route
           strict
           exact
           component={AccessoriesInterface}
           path="/accessoriesinterface"
           history={props.history}
        ></Route>

        <Route
           strict
           exact
           component={DisplayAllAccessories}
           path="/displayallaccessories"
           history={props.history}
        ></Route>

        <Route
           strict
           exact
           component={GamesInterface}
           path="/gamesinterface"
           history={props.history}
        ></Route>

        <Route
           strict
           exact
           component={DisplayAllGames}
           path="/displayallgames"
           history={props.history}
        ></Route>

        <Route
           strict
           exact
           component={Header}
           path="/header"
           history={props.history}
        ></Route>

         <Route
           strict
           exact
           component={Home}
           path="/home"
           history={props.history}
        ></Route>
         
         <Route
           strict
           exact
           component={ConsoleList}
           path="/consolelist"
           history={props.history}
        ></Route>

         <Route
           strict
           exact
           component={QtySpinner}
           path="/qtyspinner"
           history={props.history}
        ></Route>

        <Route
           strict
           exact
           component={Footer}
           path="/footer"
           history={props.history}
        ></Route>

         <Route
           strict
           exact
           component={ProductView}
           path="/productview"
           history={props.history}
        ></Route>
         
         <Route
           strict
           exact
           component={Termsandcondition}
           path="/termsandcondition"
           history={props.history}
        ></Route>
         
         <Route
           strict
           exact
           component={Documents}
           path="/documents"
           history={props.history}
        ></Route>
         
         <Route
           strict
           exact
           component={AccessoriesPicture}
           path="/accessoriespicture"
           history={props.history}
        ></Route>
         
         <Route
           strict
           exact
           component={ConsolePicture}
           path="/consolepicture"
           history={props.history}
        ></Route>
         
         <Route
           strict
           exact
           component={GamesPicture}
           path="/gamespicture"
           history={props.history}
        ></Route>

        <Route
           strict
           exact
           component={MobileRegistration}
           path="/mobileregistration"
           history={props.history}
        ></Route>

        <Route
           strict
           exact
           component={SignUpForm}
           path="/signupform"
           history={props.history}
        ></Route>
         
         <Route
           strict
           exact
           component={ShowCart}
           path="/showcart"
           history={props.history}
        ></Route>

         <Route
           strict
           exact
           component={PaymentGateWay}
           path="/paymentgateway"
           history={props.history}
        ></Route>

      </Router>

    </div>
  );
}

export default App;
