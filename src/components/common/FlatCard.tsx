import React from 'react';

interface FlatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'white' | 'gray' | 'blue' | 'emerald' | 'amber' | 'rose' | 'dark';
  bordered?: boolean;
  hoverable?: boolean;
}

export const FlatCard: React.FC<FlatCardProps> = ({
  children,
  color = 'white',
  bordered = false,
  hoverable = false,
  className = '',
  ...props
}) => {
  const colorStyles = {
    white: 'bg-white text-gray-900',
    gray: 'bg-gray-100 text-gray-900',
    blue: 'bg-blue-50 text-blue-950',
    emerald: 'bg-emerald-50 text-emerald-950',
    amber: 'bg-amber-50 text-amber-950',
    rose: 'bg-rose-50 text-rose-950',
    dark: 'bg-gray-900 text-white'
  };

  const borderStyles = bordered
    ? 'border-2 border-gray-200'
    : '';

  const hoverStyles = hoverable
    ? 'group transition-all duration-200 hover:scale-[1.015] cursor-pointer'
    : '';

  return (
    <div
      className={`rounded-lg p-6 sm:p-7 ${colorStyles[color]} ${borderStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
