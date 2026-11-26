export function Field({ label, children, error, hint, required = false }) {
  return (
    <label className={`field ${error ? 'hasError' : ''}`}>
      <span>{label}{required && <b aria-hidden="true"> *</b>}</span>
      {children}
      {(error || hint) && <small className={error ? 'fieldError' : 'fieldHint'}>{error || hint}</small>}
    </label>
  );
}
