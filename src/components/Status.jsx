import "../styles/Status.css";
import { getFarewellText } from "./utils";

function Status({ youLost, youWon, language, lastLetter }) {
  const styles = {
    backgroundColor: youWon ? "#10A95B" : youLost && "#BA2A2A",
  };

  const farewellStyles = {
    backgroundColor: "#7a5ea7",
    border: "1px dashed #323232",
  };

  return (
    <div
      className="status-container"
      aria-live="polite"
      role="status"
      style={!youWon && !youLost && lastLetter ? farewellStyles : styles}
    >
      {!youWon && !youLost && lastLetter ? (
        <p className="farewell-msg">{getFarewellText(language)} 🫡</p>
      ) : youWon ? (
        <>
          <span>You win!</span>
          <span>Well done! 🎉</span>
        </>
      ) : (
        youLost && (
          <>
            <span>Game over!</span>
            <span>You lose! Better start learning Assembly 😭</span>
          </>
        )
      )}
    </div>
  );
}

export default Status;
