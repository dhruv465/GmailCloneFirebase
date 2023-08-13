import { useEffect } from "react";
import "./App.css";
import Header from "./Mycomponents/Header";
import Sidebar from "./Mycomponents/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mail from "./Mycomponents/Mail";
import EmailList from "./Mycomponents/EmailList";
import SendMail from "./Mycomponents/SendMail";
import { useSelector } from "react-redux"
import { selectSendMessageIsOpen } from "./features/mailSlice"
import { selectUser } from "./features/userSlice"
import Login from "./Mycomponents/Login";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { login } from "./features/userSlice";

function App() {
  const sendMessageisOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        }))

      }
    })
  }, [dispatch])


  return (
    <Router>

      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />

          <div className="app_body">
            <Sidebar />

            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/">
                <EmailList />
              </Route>
            </Switch>
          </div>
          {sendMessageisOpen && < SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
