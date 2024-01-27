import React from 'react';
import { Button } from 'components/assets/buttonAssets';
import { navStyle } from 'components/assets/generalStyle';

const NavigationForm = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={navStyle}>
      <Button onClick={() => scrollToSection('dashboard-section')}>Dashboard</Button>
      <Button onClick={() => scrollToSection('transaction-entry-section')}>Transaction Entry</Button>
      <Button onClick={() => scrollToSection('transaction-import-section')}>Transaction Import</Button>
    </nav>
  );
};

export default NavigationForm;