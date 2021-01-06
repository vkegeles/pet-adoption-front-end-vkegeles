import React, { useState } from "react";
import { Copyright } from "./components/Copyright";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PetPage from "./pages/PetPage";
import { ModalContext } from "./context/ModalContext";
import LandingPage from "./pages/LandingPage";
import Theme from "./context/Theme";
import { Container, CssBaseline } from "@material-ui/core";
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
import UserPetsPage from "./pages/UserPetsPage";
import UserSettingsPage from "./pages/UserSettingsPage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  background: {
    backgroundImage: "url(/paws-2.png), url(/paws-2.png)",
    backgroundRepeat: "repeat-y",
    backgroundSize: "20vh",
    backgroundPosition: "left, right",
    // paddingTop: 20,
  },
}));

function App() {
  const classes = useStyles();

  let categories = [
    { name: "Home page", path: "/", access: 0, divider: false },
    { name: "Search pet", path: "/pets", access: 0, divider: false },
    { name: "My pets", path: "/profile/pets", access: 1, divider: false },
    {
      name: "Profile settings",
      path: "/profile/settings",
      access: 1,
      divider: false,
    },
    { name: "Add pet", path: "/admin/form", access: 2, divider: true },
    { name: "Dashboard", path: "/admin/dashboard", access: 2, divider: false },
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
                <div className={classes.background}>
                  <Container maxWidth="lg" className="container">
                    <PrivateRoute
                      exact
                      path="/profile/pets"
                      component={UserPetsPage}
                    />
                    <PrivateRoute
                      exact
                      path="/profile/settings"
                      component={UserSettingsPage}
                    />
                    <PrivateRoute
                      exact
                      path="/pets/:id/form"
                      needAdminRights={true}
                      component={AddPetFormPage}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/form"
                      needAdminRights={true}
                      component={AddPetFormPage}
                    />
                    <PrivateRoute
                      path="/admin/dashboard"
                      needAdminRights={true}
                      component={DashboardPage}
                    />
                    <Route exact path="/pets" component={SearchPage} />
                    <Route exact path="/pets/:id" component={PetPage} />
                  </Container>
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
