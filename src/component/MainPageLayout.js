import React from 'react';
import Navs from './Navs';
import Title from './Title';

const ManiPageLayout = ({ children }) => (
  <div>
    <Title
      title="BOX Office"
      subtitle="Are you lookih ofr a movie or an actor"
    />
    <Navs />

    {children}
  </div>
);

export default ManiPageLayout;
