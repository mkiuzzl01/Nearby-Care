import PropTypes from 'prop-types';

const Popular_Services_Card = ({service}) => {
    const {doctorName,doctorEmail,doctorImage,expertise,location,photo,consultation_cost,description} = service;
    return (
        <div>
            
        </div>
    );
};

Popular_Services_Card.propTypes = {
    service:PropTypes.object,
};

export default Popular_Services_Card;