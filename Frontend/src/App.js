// App.js
//import Bootstrap from 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { BoxArrowInRight, FilePerson } from "react-bootstrap-icons";
import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import V2030transparence1 from "./Logo/V2030transparence1.png";
import backgroundImage from "./Logo/V2030.png"; // Importing the background image
import "./App.css";

function App() {

  useEffect(() => {
    // Add the class when the component is mounted
    document.body.classList.add('no-padding');

    // Remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('no-padding');
    };
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProtectedRoute = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/user/protectedRoute`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 200) {
          navigate("/menu");
        } else {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };

    fetchProtectedRoute();
  }, [navigate]);

  return (
    <div style={{ background: "linear-gradient(to bottom, #007bff, #B9D56D)" }}>
      <div
        className=""
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "100vh",
          width: "100vw",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          opacity: "0.9",
        }}
      >
       <div className="container-fluid pb-5 mb-5 d-flex flex-column justify-content-center " style={{ height: "100vh" }}>
       <div className="row pb-5 mb-5  text-light text-center">
  
    <p className="display-4">Bienvenue à Valcourt2030!</p>
    <p className="fs-4" >Connectez-vous avec votre communauté et explorez tout ce que Valcourt a à offrir!</p>
    <p className="fs-4">Pour commencer, créez un compte  en cliquant sur le bouton "S'inscrire". </p>
    <p className="fs-4">Vous avez déjà un compte? Cliquez sur Connexion pour accéder à votre tableau de bord personnalisé.</p>
  
</div>
  <div className="row pt-5 mt-5   ">
    <div className="col-md-6 d-flex justify-content-center align-self-start">
      <button onClick={() => navigate("/register")} className="btn btn-light m-2 btn-custom btn-hover-effect">
        <span style={{ marginRight: "5px",  fontSize: "1.3em" }}>S'inscrire</span>
        <FilePerson size={28} />
      </button>
    </div>
    <div className="col-md-6  d-flex justify-content-center pb-5 mb-5 align-self-start">
      <button onClick={() => navigate("/login")} className="btn btn-light m-2 btn-custom btn-hover-effect ">
        <span style={{ marginRight: "5px", fontSize: "1.3em"  }}>Se connecter</span>
        <BoxArrowInRight size={28} />
      </button>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}

export default App;
