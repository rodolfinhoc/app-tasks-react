import { useState } from 'react';

interface Props {
  filter: 'ALL' | 'PENDENTE' | 'CONCLUIDA';
  onChange: (f: 'ALL' | 'PENDENTE' | 'CONCLUIDA') => void;
}

export function FilterBar({ filter, onChange }: Props) {
  const [activeFilter, setActiveFilter] = useState(filter);

  const handleFilterChange = (newFilter: 'ALL' | 'PENDENTE' | 'CONCLUIDA') => {
    setActiveFilter(newFilter);
    onChange(newFilter);
  };

  const buttonClass = (active: boolean) =>
    `flex-1 px-3 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
      active
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
        : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 shadow-md hover:shadow-lg border border-white/50 backdrop-blur-sm'
    }`;

  return (
    <div className="flex justify-center gap-1 sm:gap-3 p-1 bg-white/50 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-white/30 mx-1">
      <button 
        className={buttonClass(activeFilter === 'ALL')} 
        onClick={() => handleFilterChange('ALL')}
      >
        <span className="xs:inline">Todas</span>
      </button>
      <button 
        className={buttonClass(activeFilter === 'PENDENTE')} 
        onClick={() => handleFilterChange('PENDENTE')}
      >
        <span className="xs:inline">Pendentes</span>
      </button>
      <button 
        className={buttonClass(activeFilter === 'CONCLUIDA')} 
        onClick={() => handleFilterChange('CONCLUIDA')}
      >
        <span className="xs:inline">Concluídas</span>
      </button>
    </div>
  );
}