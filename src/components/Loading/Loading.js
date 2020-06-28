import React from 'react';

import css from './loading.module.css';

function Loading({ description }) {
  return (
    <div className={css.flexRow}>
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
        <div></div>
      </div>
      <div style={{ fontSize: '2rem', marginLeft: '10px' }}>{description}</div>
    </div>
  );
}

export default Loading;
