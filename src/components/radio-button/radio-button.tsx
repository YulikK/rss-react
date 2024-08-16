import classNames from 'classnames';
import { FieldErrors } from 'react-hook-form';

type PropsType = {
  htmlFor: string;
  children: React.ReactNode;
  checked: boolean;
  isError: boolean;
  errors: FieldErrors;
};

export const RadioButton = ({
  htmlFor,
  children,
  checked,
  errors,
  isError,
}: PropsType) => {
  const isShowError = errors['gender'] || isError;
  // console.log(errors, isError, htmlFor, checked);
  return (
    <label
      className={classNames(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-3',
        {
          'bg-accent text-accent-foreground': checked,
        },
        {
          'bg-transparent hover:bg-accent hover:text-accent-foreground cursor-pointer':
            !checked,
        },
        {
          'border-b-2 border-b-destructive': isShowError,
        }
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
