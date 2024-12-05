import "../styles/Languages.css";

function Languages({ name, backgroundColor, color, lost }) {
  const styles = {
    backgroundColor: backgroundColor,
    color: color,
  };

  return (
    <span className={`language ${lost}`} style={styles}>
      {name}
    </span>
  );
}

export default Languages;
