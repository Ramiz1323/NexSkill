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
      className={`app-card p-4 sm:p-5 md:p-6 ${
        hoverable ? 'app-card-hover' : ''
      } ${className}`}
      {...props}
    >
      {(title || subtitle || badge || action) && (
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
            {title && (
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
                {title}
              </h3>
            )}
            {badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold badge-indigo shrink-0">
                {badge}
              </span>
            )}
            {subtitle && (
              <p className="w-full text-xs text-slate-500 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0 ml-2">{action}</div>}
        </div>
      )}
      <div className="text-slate-700 min-w-0">{children}</div>
      {footer && (
        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
