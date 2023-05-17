import "./App.css";
import { SideBar } from "./components/SideBar";
import { ContentWrapper } from "./components/ContentWrapper";

function App() {
  return (
    <div id="wrapper">
      <SideBar />

      <ContentWrapper />
    </div>
  );
}

export default App;
