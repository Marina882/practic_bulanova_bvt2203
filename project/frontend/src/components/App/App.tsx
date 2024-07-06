import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import VacancySearch from '../VacancySearch/VacancySearch';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="main">
      <Header />
      <SearchForm />
      <VacancySearch />
    </div>
  );
}

export default App;