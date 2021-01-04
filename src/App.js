import React, { useState } from "react";
import { Copyright } from "./components/Copyright";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PetPage from "./pages/PetPage";
import { ModalContext } from "./context/ModalContext";
import LandingPage from "./pages/LandingPage";
import Theme from "./context/Theme";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./components/NavBar/NavBar";
import { AuthContextProvider } from "./context/AuthContext";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ModalContent from "./components/Modal/ModalContent";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import AddPetFormPage from "./pages/AddPetFormPage";
import DashboardPage from "./pages/DashboardPage";

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
  const modalfunctions = {
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
  };

  return (
    <Theme>
      <CssBaseline />
      <div className="wrapper">
        <Router>
          <AuthContextProvider>
            <ModalContext.Provider value={modalfunctions}>
              <div className={classes.root}>
                <NavBar categories={categories} />
                <PrivateRoute
                  exact
                  path="/"
                  component={HomePage}
                  altcomponent={LandingPage}
                />
                <PrivateRoute
                  path="/admin/form"
                  needAdminRights={true}
                  component={AddPetFormPage}
                />
                <PrivateRoute
                  path="/admin/dashboard"
                  needAdminRights={true}
                  component={DashboardPage}
                />
                <div className={classes.background}>
                  <Route exact path="/pets" component={SearchPage} />
                  <Route path="/pets/:id" component={PetPage} />
                </div>
              </div>
              <Modal open={modalOpen} onClose={handleCloseModal}>
                <ModalContent />
              </Modal>
              <Copyright />
            </ModalContext.Provider>
          </AuthContextProvider>
        </Router>
      </div>
    </Theme>
  );
}

export default App;
