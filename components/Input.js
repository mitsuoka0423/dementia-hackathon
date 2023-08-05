const Input = ({
  label,
  value,
  type = "text",
  id = "",
  disabled = false,
  onChange = () => { },
}) => {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor={id}>{label}</label>
      <input className="uk-input" type={type} id={id} value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
};
