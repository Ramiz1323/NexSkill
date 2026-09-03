import React from 'react';
import { Sparkles } from 'lucide-react';

const Loader = ({ message = 'Analyzing data & aligning skills...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center gap-3">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-3 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 animate-spin" />
        <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 absolute animate-pulse" />
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loader;

