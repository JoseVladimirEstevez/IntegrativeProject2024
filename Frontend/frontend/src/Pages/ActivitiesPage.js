import React, { useEffect, useState } from 'react';
import Card from '../Objects/Card';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BoxArrowInLeft } from 'react-bootstrap-icons';

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  


  
  useEffect(() => {
  
    const fetchProtectedRoute = async () => {
      
      


      if (!token) {
        navigate('/');
      } else {
        try {
          const response = await fetch('http://localhost:8080/protectedRoute', {
            method: 'GET',
            headers: {
              authorization: 'Bearer ' + token,
            },
          });

          console.log('response: ', response);
          if (response.status === 401) {
            navigate('/');
          } 
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchProtectedRoute();
  }, [navigate,token]);

  useEffect(() => {const fetchActivities = async () => {
    try {
      const response = await fetch('http://localhost:8080/activities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchActivities();
  }, []);






  return (





    <div className="container-fluid bg-white d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
    <h1>Vos activités</h1>
    <div className="d-flex justify-content-center">
    {activities.map(activity => (
  <Card
    key={activity._id}
    activity={activity}
  />
))}
    </div>
    <button onClick={() => navigate("/")} className="btn btn-primary mt-4" 
      style={{ borderRadius: '10px', 
      position: 'relative', padding: '10px 20px', transition: 'transform 0.3s' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>
        <span style={{ marginRight: '5px' }}>Se Déconnecter</span>
            <BoxArrowInLeft size={24} />
      </button>
    </div>
  );
};

export default ActivitiesPage;