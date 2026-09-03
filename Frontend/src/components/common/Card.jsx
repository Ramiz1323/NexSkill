import React from 'react';

const Card = ({
  title,
  subtitle,
  badge,
  action,
  children,
  footer,
  className = '',
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={`app-card p-5 sm:p-6 ${
        hoverable ? 'app-card-hover' : ''
      } ${className}`}
      {...props}
    >
      {(title || subtitle || badge || action) && (
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            {title && (
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {title}
              </h3>
            )}
            {badge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold badge-indigo">
                {badge}
              </span>
            )}
            {subtitle && (
              <p className="w-full text-xs text-slate-500 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="text-slate-700">{children}</div>
      {footer && (
        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
