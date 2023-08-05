const TextArea = ({
  label,
  value,
  id = "",
  disabled = false,
  height,
}) => {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor={id}>{label}</label>
      <div className="uk-form-controls">
        <textarea className="uk-textarea" id={id} value={value} disabled={disabled} style={{ height }}></textarea>
      </div>
    </div>
  );
};
