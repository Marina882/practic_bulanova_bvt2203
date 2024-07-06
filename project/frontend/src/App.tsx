import React from 'react';
import VacancySearch from './components/VacancySearch/VacancySearch';

//TODO: Сделать подгрузку вакансий
//TODO: Сделать загрузку во время наъождения ответов
//TODO: с habr и avito не ищет по поиску
//TODO: связать с бд

const App: React.FC = () => {

    return (
        <div>
            <VacancySearch />
        </div>
    );
};

export default App;
