import axios from 'axios';

const useToken = () => {
  const fetchToken = async (playerId) => {
    let token = '';
    const requests = Array.from({ length: 4 }, (_, i) =>
      axios.get(`https://cave-drone-server.shtoa.xyz/token/${i + 1}`, { params: { id: playerId } })
    );

    for (const request of requests) {
      const response = await request;
      token += response.data.chunk;
    }

    return token;
  };

  return { fetchToken };
};

export default useToken;
