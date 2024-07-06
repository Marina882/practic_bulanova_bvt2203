import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VacancyCard from '../VacancyCard/VacancyCard';
import { v4 as uuidv4 } from 'uuid';
import FilterSearch from '../FilterSearch/FilterSearch'

const VacancySearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [vacancies, setVacancies] = useState([]);
  const [experience, setExperience] = useState('');
  const [minSalary, setMinSalary] = useState('');

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/vacancies/', {
          params: {
            query,
            experience,
            min_salary: minSalary,
          },
        });
        const vacanciesWithId = response.data.map((vacancy: any) => ({
          ...vacancy,
          uniqueId: uuidv4(),
        }));
        setVacancies(vacanciesWithId);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      }
    };
    fetchVacancies();
  }, [query, experience, minSalary]);

  return (
    <>
      <div className="search-wrapper">
        <img src="/assets/curve.png" className="curve" alt="curve" />
        <div className="wrapper">
          <div className='image-wrapper'>
            <img src="/assets/cart.png" alt="cart" />
            <div className='inputs-wrapper'>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Название"
                className="search"
              />
              <FilterSearch
                experience={experience}
                setExperience={setExperience}
                minSalary={minSalary}
                setMinSalary={setMinSalary}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="cards">
        <img className="gear" src="/assets/white gear.png" alt="gear" />
        {vacancies.map((vacancy: any) => (
          <VacancyCard key={vacancy.uniqueId} vacancy={vacancy} />
        ))}
      </div>
    </>
  );
};

export default VacancySearch;

// const VacancySearch: React.FC = () => {
//   const [query, setQuery] = useState('');
//   const [vacancies, setVacancies] = useState([]);
//   const [experienceFilter] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         // const response = await axios.get(`http://localhost:8000/api/vacancies/?query=${query}&experience=${experienceFilter}`);
//         const response = await axios.get(`http://localhost:8000/api/vacancies/?query=${query}`);
//         const vacanciesWithId = response.data.map((vacancy: any) => ({
//           ...vacancy,
//           uniqueId: uuidv4(),
//         }));
//         setVacancies(vacanciesWithId);
//       } catch (error) {
//         console.error('Error fetching vacancies:', error);
//       }
//     };
//     fetchVacancies();
//   }, [query, experienceFilter]);

//   return (
//     <>
//     <div className='search-wrapper'>
//       <img src="src/assets/curve.png" className='curve' alt="curve" />
//       <div className='wrapper'>
//         <img src="src/assets/cart.png" alt="cart" />
//         <div>
//           <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Название"
//           className='search'
//           />
//         </div>
//       </div>
//       <FilterSearch/>
//     </div>
//       <div className="cards">
//         <img className='gear' src="src/assets/white gear.png" alt="gear" />
//         {/* <img className='glass' src="src/assets/glass.png" alt="glass" /> */}
//       {vacancies.map((vacancy: any) => (
//         <VacancyCard key={vacancy.uniqueId} vacancy={vacancy} />
//       ))}
//     </div>
//     </>
//   );
// };

// export default VacancySearch;
