import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const EndGamePopup = ({ isWin }) => {
    const navigate = useNavigate();

    return (
        <div className='overlay'>
            <div className='popup'>
                <h2>{isWin ? 'Congratulations, you won!' : 'Collision! Game over.'}</h2>
                <button onClick={() => navigate('/')} className='submit-button'>Try again!</button>
            </div>
        </div>
    );
};


EndGamePopup.propTypes = {
    isWin: PropTypes.bool.isRequired,
};

export default EndGamePopup;
