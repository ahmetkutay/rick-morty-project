import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../../styles/Header.scss';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="header">
            <h1>Rick And Morty</h1>
            <button className="go-back-button" onClick={handleGoBack}>
                <FiArrowLeft size={20} /> {/* Arrow-left icon */}
            </button>
        </div>
    );
};

export default Header;
