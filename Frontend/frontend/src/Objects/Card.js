import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Card.css';
import formatUTCDate from './utilDate';

const Card = ({ activity }) => {
    const navigate = useNavigate();

    useEffect(() => { 
        console.log(activity);
    }, [activity]);

    const goToActivity = () => {
        navigate(`/activities/${activity._id}`, { state: { activity } });
    };

    // const formatDate = (startDateString) => {
    //     const startDate = new Date(startDateString);
    //     const formattedDate = startDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    //     const formattedTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //     return `${formattedDate} ${formattedTime}`;
    // };

    return (
        <div className="card">
            <img src={activity.post_thumbnail} alt="Event" className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{activity.post_title}</h5>
                <p className="card-text">{activity.post_excerpt}</p>
                <p className="card-text"><small className="text-muted">Début: {formatUTCDate(activity.StartDate)}</small></p>
                <p className="card-text"><small className="text-muted">Fin: {formatUTCDate(activity.EndDate)}</small></p>
                <p className="card-text"><small className="text-muted">Tags: {activity.tags.join(', ')}</small></p>
                <div className='d-flex justify-content-center'>
                    <button 
                        onClick={goToActivity} 
                        className="btn btn-light  m-2 btn-custom btn-hover-effect" 
                    >
                        GO TO ACTIVITY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;