import Difficulty from '../components/Difficulty';
import useItit from '../hooks/useInit';
import useToken from '../hooks/useToken';
import ScoreBoard from '../components/ScoreBoard';
import { setPlayerData, setPlayerName } from '../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const complexity = useSelector((state) => state.selectedId.selectedId);
    const sessions = useSelector((state) => state.session.sessions);
    const dispatch = useDispatch();
    const { InitialUser } = useItit();
    const { fetchToken } = useToken();
    const navigate = useNavigate();



    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const id = await InitialUser(complexity, name);
        const fetchedToken = await fetchToken(id);
        dispatch(setPlayerData({ playerId: id, token: fetchedToken }));
        dispatch(setPlayerName(name));
        navigate('/game');
    };

    return (
        <section id='game-start-form' className='m-auto bg-plusBlue-200 rounded-2xl w-min p-10'>
            <form action="" onSubmit={onSubmitHandler}>
                <div>
                    <div className='flex flex-col mb-5 gap-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className='flex flex-col mb-5 gap-2'>
                        <label htmlFor="difficulty">Difficulty</label>
                        <Difficulty />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className='submit-button'>Play</button>
                    </div>
                </div>
            </form>
            {sessions.length > 0 && (
                <div className="mt-10">
                    <ScoreBoard />
                </div>
            )}
        </section>
    )
}

export default HomePage;
