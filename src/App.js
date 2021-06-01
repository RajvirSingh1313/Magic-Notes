// Main components
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Create from "./Components/Create";
import EditNote from "./Components/EditNote";
import NoteDetails from "./Components/NoteDetails";
import NotFound from "./Components/NotFound";

// Importing react-router-dom for routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar will appear in every page of the app so it will be out of switch router --> */}
        <Navbar />

        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              {/* Create note page will have two entries for title and note's detail and a add button */}
              {/* I know it is kinda weird to have ``create`` button in navbar on create page itself but I don't want some hassle or i will fix it later */}
              <Create />
            </Route>
            <Route path="/note/:id">
              {/* Note details will be simple page with just one title, paragraph containing note's detail and two buttons one for edit which will redirect user to edit note page and another one will be delete note */}
              {/* This page will take id as parameter so the component can get to know which note to fetch from localStorage */}
              <NoteDetails />
            </Route>
            <Route path="/note-edit/:id">
              {/* Edit note page will just have two entries for title and detail which will contain notes content and user can edit them */}
              {/* This page will also take id as parameter for fetching the note and writing the data again in localStorage*/}
              <EditNote />
            </Route>
            <Route path="*">
              {/* Not found will be just simple page for just redirecting user to the home page */}
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
