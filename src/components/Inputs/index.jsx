export function Input({label, nameLabel, value, onChange}) {
  return (
    <div>
      <label htmlFor={nameLabel}>{label}</label>
      <input type="number" name={nameLabel} value={value} onChange={onChange} />
    </div>
  );
}
