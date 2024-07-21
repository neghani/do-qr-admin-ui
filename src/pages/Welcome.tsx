import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  
  const onButtonClick = () => {
    // You'll update this function later
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
    </div>
  );
};

export default Home;
