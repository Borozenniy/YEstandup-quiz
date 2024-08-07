type ButtonProps = {
  mode: 'text' | 'primary';
  label: string;
  onClick?: () => void;
};

export const Button = ({ label, mode, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`button button-${mode}`}>
      <span>{label}</span>
    </button>
  );
};
