import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Sorry, that's the wrong way!</h1>
      <Link to={"/"}>
        <button>Take me home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
