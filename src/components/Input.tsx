import React, { useId } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;
    const errorId = `${inputId}-error`;

    return (
      <div className="input-wrapper">
        {label && (
          <label className="input-label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={clsx('input', error && 'input-error', className)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {error && (
          <div id={errorId} className="input-error-message" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;