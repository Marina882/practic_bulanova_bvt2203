import React from 'react';

interface VacancyCardProps {
  vacancy: any;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  return (
    <div className="card">
      <div className="all">
        <div className="name">
          <a href={vacancy.vacancy_url}>
            <h3>{vacancy.vacancy_title || 'Название'}</h3>
          </a>
          <div className="skils">
            <p>{vacancy.requirement || 'Данных о навыках не предоствлено'}</p>
          </div>
          <div className="line">
            <hr className="hr-line" />
          </div>
          <div className="task">
            <p>{vacancy.responsibility || 'Данных об описании не предоставлено'}</p>
          </div>
          <div className="location">
            <p>{vacancy.location || 'Москва'}</p>
            <p>{vacancy.experience || 'Данных об опыте не предоставлено'}</p>
          </div>
        </div>
        <div className="price-vacancy">
          <p>{vacancy.salary + ' руб.' || '50 000 руб.'}</p>
        </div>
      </div>
    </div>
  );
}

export default VacancyCard;
