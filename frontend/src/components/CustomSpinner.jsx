import Spinner from "react-bootstrap/Spinner";

function CustomSpinner({
  animation = "border",
  variant = "primary",
  size = "sm",
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner animation={animation} variant={variant} size={size} />
    </div>
  );
}

export default CustomSpinner;
