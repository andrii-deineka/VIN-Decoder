import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, className, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && <label className="input-label">{label}</label>}
        <input
          ref={ref}
          className={clsx('input', error && 'input-error', className)}
          {...props}
        />
        {error && <div className="input-error-message">{error}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;