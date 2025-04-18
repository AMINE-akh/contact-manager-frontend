import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  rows = 4,
  ...props
}, ref) => {
  const textareaClasses = `
    bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    shadow-sm py-2 px-4 block
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={textareaClasses}
        rows={rows}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;