import React from 'react';

interface FlatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const FlatButton: React.FC<FlatButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-200 focus:outline-none cursor-pointer select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 rounded-md h-9 gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-md h-11 gap-2',
    lg: 'text-base px-7 py-3.5 rounded-md h-14 gap-2.5 hover:scale-105'
  };

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-105',
    outline: 'bg-transparent text-blue-600 border-4 border-blue-600 hover:bg-blue-600 hover:text-white',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:scale-105',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
