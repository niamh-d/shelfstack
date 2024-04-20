import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ShelvesProvider } from "./contexts/ShelvesContext";

//PAGES
import TitlePage from "./views/TitlePage";
import ProfileView from "./views/ProfileView";
import Login from "./views/Login";
import SignUp from "./views/Signup";
import ErrorPage from "./views/ErrorPage";
import ExploreShelvesView from "./views/ExploreShelvesView";
import FavoritesView from "./views/FavoritesView";

//COMPONENTS
import StandAloneShelf from "./components/StandAloneShelf";

//Roboto fonts for MaterialUI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.scss";

const App = () => {
  return (
    <AuthProvider>
      <ShelvesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<TitlePage />} />

            <Route path="/profile/:userId" element={<ProfileView />}>
              {/* Inside profile - view profile info (navbar) shelves, addshelf form. */}
            </Route>

            <Route path="/shelf/:shelfId" element={<StandAloneShelf />} />

            <Route path="/favorites/:userId" element={<FavoritesView />} />

            <Route
              path="/explore-shelves"
              element={<ExploreShelvesView />}
            ></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* TEST USEPARAMS ROUTE */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ShelvesProvider>
    </AuthProvider>
  );
};

export default App;
