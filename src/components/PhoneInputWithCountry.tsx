import React from 'react';
import { ALL_COUNTRIES } from '../data/countries';

interface PhoneInputWithCountryProps {
  phone: string;
  countryCode: string;
  onPhoneChange: (phone: string) => void;
  onCountryCodeChange: (code: string) => void;
  required?: boolean;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const PhoneInputWithCountry: React.FC<PhoneInputWithCountryProps> = ({
  phone,
  countryCode,
  onPhoneChange,
  onCountryCodeChange,
  required = true,
  placeholder,
  label = 'WhatsApp / Phone Number *',
  className = ''
}) => {
  // Default placeholder per country
  const dynamicPlaceholder = placeholder || (
    countryCode === '+91' ? '98765 43210' :
    countryCode === '+1' ? '415 555 2671' :
    countryCode === '+44' ? '7911 123456' :
    countryCode === '+971' ? '50 123 4567' :
    countryCode === '+61' ? '412 345 678' :
    'Enter mobile / WhatsApp number'
  );

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold">
          {label}
        </label>
      )}
      <div className="flex rounded-xl border border-[#D4AF37]/35 bg-white overflow-hidden focus-within:border-[#9B332C] focus-within:ring-1 focus-within:ring-[#9B332C] transition-all shadow-sm">
        <select
          aria-label="Country Calling Code"
          value={countryCode}
          onChange={e => onCountryCodeChange(e.target.value)}
          className="bg-[#FAF5EE] border-r border-[#D4AF37]/35 px-3 py-2.5 text-xs text-[#241A16] font-bold focus:outline-none cursor-pointer max-w-[130px] sm:max-w-[150px] shrink-0 font-royal-body"
        >
          <optgroup label="Common Export Markets">
            {ALL_COUNTRIES.filter(c => c.popular).map(c => (
              <option key={`pop-${c.code}-${c.dialCode}`} value={c.dialCode}>
                {c.dialCode} ({c.name})
              </option>
            ))}
          </optgroup>
          <optgroup label="All Countries (A - Z)">
            {ALL_COUNTRIES.filter(c => !c.popular).map(c => (
              <option key={`all-${c.code}-${c.dialCode}`} value={c.dialCode}>
                {c.dialCode} ({c.name})
              </option>
            ))}
          </optgroup>
        </select>
        <input
          type="tel"
          required={required}
          placeholder={dynamicPlaceholder}
          value={phone}
          onChange={e => onPhoneChange(e.target.value)}
          className="flex-1 px-3 py-2.5 text-xs text-[#241A16] bg-transparent focus:outline-none font-royal-body"
        />
      </div>
      <p className="text-[10px] text-stone-500 font-royal-body">
        Select your country dialing code above. We share HD production video proofs &amp; quotes via WhatsApp.
      </p>
    </div>
  );
};
