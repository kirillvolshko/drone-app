import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedId } from '../store/reducer';

function Difficulty() {
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.selectedId.selectedId);

  const handleClick = (id) => {
    dispatch(setSelectedId(id));
  };

  const blocks = Array.from({ length: 10 }, (_, index) => {
    const id = index + 1;
    return (
      <div
        key={id}
        onClick={() => handleClick(id)}
        className={`py-2 px-8 rounded-lg cursor-pointer ${
          selectedId === id ? 'bg-plusBlue-100 text-plusBlue' : 'bg-plusBlue text-plusBlue-200'
        }`}
      >
        {id}
      </div>
    );
  });

  return <div className="flex flex-wrap gap-2 w-[300px]">{blocks}</div>;
}

export default Difficulty;
