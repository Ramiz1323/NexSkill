import React from 'react';

const Card = ({ title, children, footer, className = '', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {title && <div className="card-header font-bold">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
