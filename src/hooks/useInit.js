import axios from "axios";

const useItit = () => {

    const InitialUser = async (difficulty, name) => {
        try {
            const initResponse = await axios.post('https://cave-drone-server.shtoa.xyz/init', { name, complexity: difficulty });
            const playerId = initResponse.data.id;
            return playerId;
        } catch (error) {
            console.error('Failed to initialize game:', error);
            return null;
        }
    }

    return { InitialUser };
};

export default useItit;
