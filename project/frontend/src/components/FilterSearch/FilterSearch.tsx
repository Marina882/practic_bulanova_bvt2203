import React from 'react';
import './FilterSearch.css'; // Импортируем стили

interface FilterSearchProps {
  experience: string;
  setExperience: (value: string) => void;
  minSalary: string;
  setMinSalary: (value: string) => void;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ experience, setExperience, minSalary, setMinSalary }) => {
  const handleSalaryBlur = () => {
    setMinSalary(minSalary);
  };

  return (
    <div className="filter-search">
      <input
        type="number"
        placeholder="Заработная плата от"
        value={minSalary}
        onChange={(e) => setMinSalary(e.target.value)}
        onBlur={handleSalaryBlur} // Применение фильтра при потере фокуса
        className="custom-input"
      />
      <div className="radio-group">
        <label className="custom-radio">
          <input
            type="radio"
            value="С опытом"
            checked={experience === 'С опытом'}
            onChange={(e) => setExperience(e.target.value)}
          />
          <span>с опытом</span>
        </label>
        <label className="custom-radio">
          <input
            type="radio"
            value="Без опыта"
            checked={experience === 'Без опыта'}
            onChange={(e) => setExperience(e.target.value)}
          />
          <span>без опыта</span>
        </label>
        <label className="custom-radio">
          <input
            type="radio"
            value=""
            checked={experience === ''}
            onChange={() => setExperience('')}
          />
          <span>Все</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSearch;
