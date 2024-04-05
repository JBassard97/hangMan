import Keyboard from "./Components/Keyboard/Keyboard";
import Gallows from "./Components/Gallows/Gallows";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home-page">
      <h2>Hangman 69</h2>
      <Gallows />
      <Keyboard />
    </div>
  );
}
