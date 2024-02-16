import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function ConnectionPage() {
  const [form, setForm] = useState({
    courriel: '',
    motDePasse: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('data: ', data);
      localStorage.setItem('prenom', data.user.prenom);
      

      toast.success('Login successful!',  { autoClose: 3000 , pauseOnHover: false });
      setTimeout(() => {
        navigate('/menu');  // Navigate to /menu after a delay
      }, 4000);
      // Handle successful login here
    } else {
      const data = await response.json();
      toast.error(data.message, { autoClose: 3000, pauseOnHover: false });
      // Handle error here
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: 'white' }}>
        <div className="text-center">
          <h1>Connexion</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Adresse Courriel:</label>
              <input type="email" className="form-control" id="email" onChange={e => setForm({ ...form, courriel: e.target.value })} name="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mot de Passe:</label>
              <input type="password" className="form-control" id="password" onChange={e => setForm({ ...form, motDePasse: e.target.value })} name="password" />
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" onClick={() => navigate("/")} className="btn btn-primary">Annuler</button>
              <button type="submit" className="btn btn-primary">Se Connecter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConnectionPage;
