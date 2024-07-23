import "./App.css";
import { Route, Routes } from "react-router-dom";
import homePage from "./pages/HomePage";
import ChatPage from "./pages/ChatsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={homePage} />
        <Route path="/chats" Component={ChatPage} />
      </Routes>
    </div>
  );
}

export default App;
