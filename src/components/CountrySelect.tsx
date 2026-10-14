import React from 'react';
import { ALL_COUNTRIES } from '../data/countries';

interface CountrySelectProps {
  value: string;
  onChange: (country: string) => void;
  required?: boolean;
  label?: string;
  className?: string;
  selectClassName?: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  required = true,
  label = 'Destination Country *',
  className = '',
  selectClassName = ''
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold">
          {label}
        </label>
      )}
      <select
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full px-3.5 py-2.5 bg-white border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] transition-all cursor-pointer font-royal-body shadow-sm ${selectClassName}`}
      >
        <option value="" disabled>Select your country...</option>
        <optgroup label="Common Export Markets">
          {ALL_COUNTRIES.filter(c => c.popular).map(c => (
            <option key={`dest-pop-${c.code}`} value={c.name}>
              {c.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="All Countries (A - Z)">
          {ALL_COUNTRIES.filter(c => !c.popular).map(c => (
            <option key={`dest-all-${c.code}`} value={c.name}>
              {c.name}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};
