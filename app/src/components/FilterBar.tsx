interface Props {
  filter: 'ALL' | 'PENDENTE' | 'CONCLUIDA';
  onChange: (f: 'ALL' | 'PENDENTE' | 'CONCLUIDA') => void;
}

export function FilterBar({ filter, onChange }: Props) {
  const buttonClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      active
        ? 'bg-blue-600 text-white shadow-md scale-105'
        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
    }`;

  return (
    <div className="flex justify-center gap-2 mt-5 flex-wrap">
      <button className={buttonClass(filter === 'ALL')} onClick={() => onChange('ALL')}>
        Todas
      </button>
      <button className={buttonClass(filter === 'PENDENTE')} onClick={() => onChange('PENDENTE')}>
        Pendentes
      </button>
      <button className={buttonClass(filter === 'CONCLUIDA')} onClick={() => onChange('CONCLUIDA')}>
        Concluídas
      </button>
    </div>
  );
}
