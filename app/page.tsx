import Keyboard from "./Components/Keyboard/Keyboard";
import Gallows from "./Components/Gallows/Gallows";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home-page">
      <h1>Hangman 69</h1>
      <Gallows />
      <Keyboard />
    </div>
  );
}
