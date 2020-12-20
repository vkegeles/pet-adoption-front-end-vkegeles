import React from "react";
import { Copyright } from "./components/Copyright";
import { MotionLayoutProvider } from "react-motion-layout";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import PetPage from "./components/PetPage";
import { PetListContext } from "./context/PetListContext";
import LandingPage from "./components/LandingPage";
import Theme from "./context/Theme";
import NavBar from "./components/NavBar";
import { CssBaseline } from "@material-ui/core";

function App() {
  let pets = [
    {
      id: 1,
      name: "Bella",
      type: "cat",
      gender: "female",
      adoptionStatus: "foster",
      picture:
        "https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg",
      height: "30sm",
      weight: "6kg",
      color: "black",
      bio: "Cute cat want to find a new family",
      nonAllergy: true,
      diet: "only meat",
      breed: "none",
    },
    {
      id: 2,
      name: "Chloe",
      type: "cat",
      gender: "female",
      adoptionStatus: "foster",
      picture:
        "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg",
      height: "30sm",
      weight: "6kg",
      color: "black",
      bio: "Cute cat want to find a new family",
      nonAllergy: true,
      diet: "only meat",
      breed: "none",
    },
    {
      id: 3,
      name: "Leo",
      type: "cat",
      gender: "male",
      adoptionStatus: "none",
      picture:
        "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg",
      height: "30sm",
      weight: "6kg",
      color: "black",
      bio: "Cute cat want to find a new family",
      nonAllergy: true,
      diet: "only meat",
      breed: "none",
    },
    {
      id: 4,
      name: "Luna",
      type: "dog",
      gender: "female",
      adoptionStatus: "foster",
      picture:
        "https://i.pinimg.com/originals/71/f1/84/71f1843b56fa00a64c429a1980657dc5.jpg",
      height: "30sm",
      weight: "6kg",
      color: "black",
      bio: "Cute dog want to find a new family",
      nonAllergy: true,
      diet: "only meat",
      breed: "none",
    },
    {
      id: 5,
      name: "Charlie",
      type: "dog",
      gender: "male",
      adoptionStatus: "none",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT82mKzjSXIHY0w40uodifHxJUnbgkhcYWZlg&usqp=CAU",
      height: "30sm",
      weight: "6kg",
      color: "black",
      bio: "Cute dog want to find a new family",
      nonAllergy: true,
      diet: "only meat",
      breed: "none",
    },
  ];
  return (
    <Theme>
      <CssBaseline />
      <div className="wrapper">
        <Router>
          <MotionLayoutProvider>
            <PetListContext.Provider value={pets}>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/pets" component={SearchPage} />
              <Route path="/pets/:id" component={PetPage} />
            </PetListContext.Provider>
            <Copyright />
          </MotionLayoutProvider>
        </Router>
      </div>
    </Theme>
  );
}

export default App;
