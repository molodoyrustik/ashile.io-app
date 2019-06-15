import React from 'react';

import ValidationHoc from '../../HOC/ValidationHoc';

const MainLayout = (props) => {
  return (
    <div>
      <div className='wrapper'>
        <div className="main-content">
          <ValidationHoc>
            {props.children}
          </ValidationHoc>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
