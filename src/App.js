import React, { useState } from "react";
import { Copyright } from "./components/Copyright";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PetPage from "./pages/PetPage";
import { PetListContext } from "./context/PetListContext";
import LandingPage from "./pages/LandingPage";
import Theme from "./context/Theme";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./components/NavBar/NavBar";
import { AuthContextProvider } from "./context/AuthContext";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Login from "./components/Login";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  background: {
    backgroundImage: "url(/paws-2.png)",
    backgroundRepeat: "repeat",
    backgroundSize: "20vh",
    backgroundPosition: "center bottom",
    paddingTop: 20,
  },
}));

function App() {
  const classes = useStyles();
  let pets = [
    {
      id: 1,
      name: "Bella",
      type: "cat",
      gender: "female",
      status: "foster",
      picture:
        "https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg",
      height: "30sm",
      weight: "6kg",
      color: "black",
      bio: "Cute cat want to find a new family",
      hypoallergenic: true,
      diet: "only meat",
      breed: "American Shorthair",
    },
    {
      id: 2,
      name: "Chloe",
      type: "cat",
      gender: "female",
      status: "foster",
      picture:
        "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg",
      height: "30sm",
      weight: "6kg",
      color: "black",
      bio: "Cute cat want to find a new family",
      hypoallergenic: true,
      diet: "only meat",
      breed: "Domestic",
    },
    {
      id: 3,
      name: "Leo",
      type: "cat",
      gender: "male",
      status: "none",
      picture:
        "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg",
      height: "30sm",
      weight: "6kg",
      color: "black",
      bio: "Cute cat want to find a new family",
      hypoallergenic: true,
      diet: "only meat",
      breed: "British Shorthair",
    },
    {
      id: 4,
      name: "Luna",
      type: "dog",
      gender: "female",
      status: "foster",
      picture:
        "https://i.pinimg.com/originals/71/f1/84/71f1843b56fa00a64c429a1980657dc5.jpg",
      height: "30sm",
      weight: "6kg",
      color: "black",
      bio: "Cute dog want to find a new family",
      hypoallergenic: true,
      diet: "only meat",
      breed: "Domestic",
    },
    {
      id: 5,
      name: "Charlie",
      type: "dog",
      gender: "male",
      status: "none",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT82mKzjSXIHY0w40uodifHxJUnbgkhcYWZlg&usqp=CAU",
      height: "30sm",
      weight: "6kg",
      color: "black",
      bio: "Cute dog want to find a new family",
      hypoallergenic: true,
      diet: "only meat",
      breed: "Domestic",
    },
  ];
  let categories = [
    { name: "Home page", path: "/" },
    { name: "Search pet", path: "/pets" },
    { name: "Add pet", path: "/admin/form" },
    { name: "Dashboard", path: "/admin/dashboard" },
  ];

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Theme>
      <CssBaseline />
      <div className="wrapper">
        <Router>
          <AuthContextProvider>
            <PetListContext.Provider value={pets}>
              <div className={classes.root}>
                <NavBar categories={categories} onOpenModal={handleOpenModal} />
                <Route exact path="/" component={LandingPage} />
                <div className={classes.background}>
                  <Route exact path="/pets" component={SearchPage} />
                  <Route path="/pets/:id" component={PetPage} />
                </div>
              </div>
            </PetListContext.Provider>
            <Modal open={modalOpen} onClose={handleCloseModal}>
              <Login closeModal={handleCloseModal} />
            </Modal>
            <Copyright />
          </AuthContextProvider>
        </Router>
      </div>
    </Theme>
  );
}

export default App;
