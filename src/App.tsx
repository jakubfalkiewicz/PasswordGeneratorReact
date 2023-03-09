import React from 'react';
import { HomePage } from "@modules";
import { MainMenuGlobalComponent } from "@/global-components";

const App: React.FC = () => (
  <>
    <MainMenuGlobalComponent />
    <HomePage msg="INVO Academy Starter with React + TypeScript" />
  </>
);

export default App;
