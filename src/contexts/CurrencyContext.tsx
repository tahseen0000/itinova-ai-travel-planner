import React, { createContext, useContext, useState, ReactNode } from 'react';

type CurrencyCode = 'USD' | 'EUR' | 'INR' | 'GBP' | 'JPY';

interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD (1 USD = rate)
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'INR', symbol: '₹', rate: 83.0 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'JPY', symbol: '¥', rate: 150.0 },
];

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (code: CurrencyCode) => void;
  convertPrice: (priceInUSD: number) => string;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);

  const setCurrency = (code: CurrencyCode) => {
    const currency = currencies.find(c => c.code === code);
    if (currency) setSelectedCurrency(currency);
  };

  const convertPrice = (priceInUSD: number): string => {
    const converted = priceInUSD * selectedCurrency.rate;
    // Format: remove cents if whole number
    const rounded = Math.round(converted * 100) / 100;
    return `${selectedCurrency.symbol}${rounded.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency: setCurrency,
        convertPrice,
        currencies,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};