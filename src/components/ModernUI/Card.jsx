// Modern Card Component with Multiple Variants
import React, { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  hoverable = false,
  clickable = false,
  className = '',
  header,
  footer,
  onClick,
  ...props
}, ref) => {
  // Base classes
  const baseClasses = 'card-modern';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg border-0',
    outlined: 'bg-transparent border-2 border-gray-200',
    filled: 'bg-gray-50 border border-gray-200',
    glass: 'glass border border-white/20',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  // Interactive classes
  const interactiveClasses = [];
  
  if (hoverable) {
    interactiveClasses.push('hover:shadow-lg hover:-translate-y-1');
  }
  
  if (clickable) {
    interactiveClasses.push('cursor-pointer active:scale-95');
  }
  
  // Combine classes
  const cardClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    ...interactiveClasses,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (clickable && onClick) {
      onClick(e);
    }
  };

  const CardContent = () => (
    <div className={cardClasses} onClick={handleClick} {...props}>
      {header && (
        <div className="card-header">
          {header}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );

  if (ref) {
    return (
      <div ref={ref}>
        <CardContent />
      </div>
    );
  }

  return <CardContent />;
});

Card.displayName = 'Card';

// Card sub-components
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`card-body ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`card-footer ${className}`} {...props}>
    {children}
  </div>
);

// Export main component and sub-components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;


