import React from 'react';
import WelcomeCard from './WelcomeCard';
import SalesState from './SalesState';

const Page1 = () => {
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <WelcomeCard data={[]} />
      </div>
      <div style={{ marginTop: '30px' }}>
        <SalesState salesState={[]} saleChartData={[]} />
      </div>
    </>
  );
};

export default Page1;
