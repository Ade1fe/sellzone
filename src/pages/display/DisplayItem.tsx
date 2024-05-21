import React from 'react';
import { useLocation } from 'react-router-dom';



interface LocationState {
   id?: string;
  }

const DisplayItem: React.FC<LocationState> = () => {
    const location = useLocation();
    const {id} = (location.state as LocationState) || {};
  return (
    <div>
      <h2>Document ID: {id}</h2>
      {/* Add more content to display details based on the ID */}
    </div>
  );
};

export default DisplayItem;
