type ButtonProps = {
  mode: 'text' | 'primary';
  label: string;
};

export const Button = ({ label, mode }: ButtonProps) => {
  return (
    <button className={mode}>
      <span>{label}</span>
    </button>
  );
};
