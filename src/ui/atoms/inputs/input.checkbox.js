export const CheckboxInput = ({ label, checked, onClick }) => {
  return (
    <div
      className="flex gap-1 items-center hover:cursor-pointer"
      onClick={onClick}
    >
      <input
        type="checkbox"
        className="hover:cursor-pointer"
        checked={checked}
      />
      <span className="text-sm">{label}</span>
    </div>
  );
};
