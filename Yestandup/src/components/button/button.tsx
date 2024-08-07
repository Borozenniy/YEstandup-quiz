import './button.scss';

type ButtonProps = {
  mode: 'text' | 'primary';
  label: string;
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  label,
  mode,
  size = 'medium',
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button button-${mode} button-${size}`}
    >
      <span>{label}</span>
    </button>
  );
};
