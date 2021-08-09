type Props = {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: "submit" | "button";
};

const FormButton = ({
  children,
  disabled,
  className,
  onClick,
  type,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={`mt-5 outline-none border-2 py-2 px-3 sm:py-3 sm:px-4 rounded-lg shadow-sm transition-all hover:brightness-110 disabled:hover:brightness-100 disabled:grayscale disabled:cursor-default ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FormButton;
