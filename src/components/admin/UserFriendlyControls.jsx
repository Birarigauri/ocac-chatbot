import { Info, HelpCircle } from "lucide-react";

// Reusable user-friendly components
export const FriendlyCard = ({ title, description, icon, children }) => (
  <div className="card border-0 bg-light h-100">
    <div className="card-body">
      <h6 className="card-title d-flex align-items-center">
        <span className="me-2">{icon}</span>
        {title}
      </h6>
      {description && (
        <p className="card-text small text-muted mb-3">{description}</p>
      )}
      {children}
    </div>
  </div>
);

export const ColorPicker = ({ label, value, onChange, helpText }) => (
  <div className="mb-3">
    <label className="form-label small fw-semibold d-flex align-items-center">
      <span className="me-2">{label}</span>
      {helpText && <Info size={12} className="text-muted" title={helpText} />}
    </label>
    <div className="d-flex align-items-center">
      <input 
        type="color" 
        className="form-control form-control-color me-2" 
        value={value}
        onChange={onChange}
      />
      <code className="small">{value}</code>
    </div>
  </div>
);

export const ButtonGroup = ({ label, options, value, onChange, helpText }) => (
  <div className="mb-3">
    <label className="form-label small fw-semibold d-flex align-items-center">
      <span className="me-2">{label}</span>
      {helpText && <HelpCircle size={12} className="text-muted" title={helpText} />}
    </label>
    <div className="btn-group w-100" role="group">
      {options.map((option, index) => (
        <div key={option.value}>
          <input 
            type="radio" 
            className="btn-check" 
            name={`${label}-${index}`}
            id={`${label}-${option.value}`}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <label 
            className="btn btn-outline-secondary" 
            htmlFor={`${label}-${option.value}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export const SliderControl = ({ label, min, max, value, onChange, unit = "px", helpText }) => (
  <div className="mb-3">
    <label className="form-label small fw-semibold d-flex align-items-center justify-content-between">
      <span className="d-flex align-items-center">
        <span className="me-2">{label}</span>
        {helpText && <Info size={12} className="text-muted" title={helpText} />}
      </span>
      <span className="badge bg-secondary">{value}{unit}</span>
    </label>
    <input 
      type="range" 
      className="form-range" 
      min={min} 
      max={max} 
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <div className="d-flex justify-content-between small text-muted">
      <span>{min}{unit}</span>
      <span>{max}{unit}</span>
    </div>
  </div>
);

export const TipAlert = ({ children }) => (
  <div className="alert alert-info py-2 mb-4">
    <small><strong>💡 Tip:</strong> {children}</small>
  </div>
);