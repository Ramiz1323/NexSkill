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
      className={`app-card p-5 md:p-6 ${
        hoverable ? 'app-card-hover' : ''
      } ${className}`}
      {...props}
    >

      {(title || subtitle || badge || action) && (
        <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5">
              {title && (
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {title}
                </h3>
              )}
              {badge && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold badge-indigo">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="text-slate-700 dark:text-slate-300">{children}</div>
      {footer && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;

