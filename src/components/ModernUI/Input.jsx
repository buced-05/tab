// Modern Input Component with Validation and States
import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Input = forwardRef(({
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  type = 'text',
  size = 'md',
  fullWidth = true,
  disabled = false,
  required = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Determine input type
  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Base classes
  const baseClasses = 'input-modern w-full transition-modern';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };
  
  // State classes
  const stateClasses = {
    error: 'border-red-500 focus:border-red-500 focus:ring-red-200',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-200',
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : '';
  
  // Padding adjustment for icons
  const paddingClasses = leftIcon ? 'pl-10' : '';
  const rightPaddingClasses = (rightIcon || type === 'password') ? 'pr-10' : '';
  
  // Determine state
  const currentState = error ? 'error' : success ? 'success' : 'default';
  
  // Combine classes
  const inputClasses = [
    baseClasses,
    sizeClasses[size],
    stateClasses[currentState],
    disabledClasses,
    paddingClasses,
    rightPaddingClasses,
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'relative',
    fullWidth ? 'w-full' : '',
    containerClassName
  ].filter(Boolean).join(' ');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Left icon */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{leftIcon}</span>
          </div>
        )}

        {/* Input field */}
        <input
          ref={ref}
          type={inputType}
          className={inputClasses}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Right icon or password toggle */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {type === 'password' ? (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          ) : rightIcon ? (
            <span className="text-gray-400">{rightIcon}</span>
          ) : null}
        </div>

        {/* Status icons */}
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <AlertCircle className="text-red-500" size={20} />
          </div>
        )}
        
        {success && !error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <CheckCircle className="text-green-500" size={20} />
          </div>
        )}
      </div>

      {/* Helper text */}
      {(helperText || error) && (
        <div className="mt-2">
          {error && (
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle className="mr-1" size={16} />
              {error}
            </p>
          )}
          {!error && helperText && (
            <p className="text-sm text-gray-600">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;


