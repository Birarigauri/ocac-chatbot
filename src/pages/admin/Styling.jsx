import { useState } from "react";
import { Palette, Type, Layout, Smartphone, Square, MousePointer, FileText, Grid, Info, RotateCcw, Eye, Save } from "lucide-react";

const Styling = () => {
  const [activeTab, setActiveTab] = useState('colors');
  const [showPreview, setShowPreview] = useState(true);

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  };

  const colorOptions = [
    { name: 'Primary Green', value: '#22c55e', preview: '#22c55e' },
    { name: 'Blue', value: '#3b82f6', preview: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6', preview: '#8b5cf6' },
    { name: 'Orange', value: '#f97316', preview: '#f97316' },
    { name: 'Red', value: '#ef4444', preview: '#ef4444' }
  ];

  const fontOptions = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' }
  ];

  const layoutOptions = [
    { name: 'Compact', spacing: 'sm', borderRadius: '0.25rem' },
    { name: 'Default', spacing: 'md', borderRadius: '0.5rem' },
    { name: 'Spacious', spacing: 'lg', borderRadius: '0.75rem' },
    { name: 'Extra Spacious', spacing: 'xl', borderRadius: '1rem' }
  ];

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'buttons', label: 'Buttons', icon: MousePointer },
    { id: 'inputs', label: 'Inputs', icon: FileText },
    { id: 'cards', label: 'Cards', icon: Square },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'components', label: 'Components', icon: Grid },
    { id: 'responsive', label: 'Responsive', icon: Smartphone }
  ];

  return (
    <div>
      <div className="row g-4">
        {/* Tabs */}
        <div className="col-12">
          <div style={cardStyle}>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
              <div className="d-flex flex-wrap">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`btn me-2 mb-2 d-flex align-items-center ${
                        activeTab === tab.id ? 'btn-success' : 'btn-outline-secondary'
                      }`}
                      style={{ fontSize: '0.875rem' }}
                    >
                      <Icon size={14} className="me-1" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn btn-outline-primary btn-sm d-flex align-items-center"
              >
                <Eye size={14} className="me-1" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
            </div>

            {/* Colors Tab */}
            {activeTab === 'colors' && (
              <div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 me-2">🎨 Choose Your Colors</h5>
                  <Info size={16} className="text-muted" title="Select colors that match your brand" />
                </div>
                
                <div className="alert alert-info py-2 mb-4">
                  <small><strong>Tip:</strong> Choose colors that work well together and provide good contrast for readability.</small>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Primary Color</label>
                    <div className="row g-2">
                      {colorOptions.map(color => (
                        <div key={color.value} className="col-4">
                          <div 
                            className="p-3 rounded text-center cursor-pointer border"
                            style={{ backgroundColor: color.preview, color: 'white', cursor: 'pointer' }}
                          >
                            <div 
                              style={{
                                width: '30px',
                                height: '30px',
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                borderRadius: '50%',
                                margin: '0 auto 8px'
                              }}
                            />
                            <small className="fw-semibold">{color.name}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Background Colors</label>
                    <div className="mb-3">
                      <label className="form-label small">Main Background</label>
                      <input type="color" className="form-control form-control-color" defaultValue="#ffffff" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Secondary Background</label>
                      <input type="color" className="form-control form-control-color" defaultValue="#f8f9fa" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Accent Color</label>
                      <input type="color" className="form-control form-control-color" defaultValue="#e5e7eb" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Typography Tab */}
            {activeTab === 'typography' && (
              <div>
                <h5 className="mb-4">Typography Settings</h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Font Family</label>
                    <select className="form-select mb-3">
                      {fontOptions.map(font => (
                        <option key={font.value} value={font.value}>{font.name}</option>
                      ))}
                    </select>
                    
                    <label className="form-label fw-semibold">Font Sizes</label>
                    <div className="row g-2">
                      <div className="col-6">
                        <label className="form-label small">Base Size</label>
                        <select className="form-select">
                          <option>14px</option>
                          <option>16px</option>
                          <option>18px</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label small">Heading Scale</label>
                        <select className="form-select">
                          <option>1.2</option>
                          <option>1.25</option>
                          <option>1.5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Preview</label>
                    <div className="p-3 border rounded">
                      <h1 className="h3">Heading Example</h1>
                      <p className="mb-2">This is a paragraph example with the selected typography settings.</p>
                      <small className="text-muted">Small text example</small>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Layout Tab */}
            {activeTab === 'layout' && (
              <div>
                <h5 className="mb-4">Layout & Spacing</h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Spacing Scale</label>
                    <div className="row g-2 mb-4">
                      {layoutOptions.map(layout => (
                        <div key={layout.name} className="col-6">
                          <div className="p-3 border rounded text-center cursor-pointer">
                            <div className="fw-semibold">{layout.name}</div>
                            <small className="text-muted">Spacing: {layout.spacing}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <label className="form-label fw-semibold">Border Radius</label>
                    <input type="range" className="form-range" min="0" max="20" defaultValue="8" />
                    <div className="d-flex justify-content-between small text-muted">
                      <span>Sharp</span>
                      <span>Rounded</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Component Spacing</label>
                    <div className="mb-3">
                      <label className="form-label small">Card Padding</label>
                      <select className="form-select">
                        <option>Compact (12px)</option>
                        <option>Default (16px)</option>
                        <option>Spacious (24px)</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Button Height</label>
                      <select className="form-select">
                        <option>Small (32px)</option>
                        <option>Medium (40px)</option>
                        <option>Large (48px)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons Tab */}
            {activeTab === 'buttons' && (
              <div>
                <h5 className="mb-4">Button Styling</h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Button Sizes</label>
                    <div className="mb-3">
                      <label className="form-label small">Small Button Height</label>
                      <input type="range" className="form-range" min="28" max="40" defaultValue="32" />
                      <div className="d-flex justify-content-between small text-muted">
                        <span>28px</span><span>40px</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Medium Button Height</label>
                      <input type="range" className="form-range" min="36" max="48" defaultValue="40" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Large Button Height</label>
                      <input type="range" className="form-range" min="44" max="56" defaultValue="48" />
                    </div>
                    
                    <label className="form-label fw-semibold">Button Styles</label>
                    <div className="mb-3">
                      <label className="form-label small">Border Radius</label>
                      <select className="form-select">
                        <option>Sharp (0px)</option>
                        <option>Slightly Rounded (4px)</option>
                        <option>Rounded (8px)</option>
                        <option>Very Rounded (12px)</option>
                        <option>Pill (999px)</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Button Weight</label>
                      <select className="form-select">
                        <option>Light</option>
                        <option>Normal</option>
                        <option>Medium</option>
                        <option>Semibold</option>
                        <option>Bold</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Button Preview</label>
                    <div className="p-3 border rounded">
                      <div className="d-flex flex-column gap-2">
                        <button className="btn btn-success btn-sm">Small Button</button>
                        <button className="btn btn-success">Medium Button</button>
                        <button className="btn btn-success btn-lg">Large Button</button>
                        <button className="btn btn-outline-success">Outline Button</button>
                        <button className="btn btn-link text-success">Link Button</button>
                      </div>
                    </div>
                    
                    <label className="form-label fw-semibold mt-3">Hover Effects</label>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Scale on hover</label>
                    </div>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Shadow on hover</label>
                    </div>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Color transition</label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Inputs Tab */}
            {activeTab === 'inputs' && (
              <div>
                <h5 className="mb-4">Input & Form Styling</h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Input Dimensions</label>
                    <div className="mb-3">
                      <label className="form-label small">Input Height</label>
                      <select className="form-select">
                        <option>Small (32px)</option>
                        <option>Medium (40px)</option>
                        <option>Large (48px)</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Border Width</label>
                      <input type="range" className="form-range" min="1" max="4" defaultValue="1" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Border Radius</label>
                      <input type="range" className="form-range" min="0" max="16" defaultValue="4" />
                    </div>
                    
                    <label className="form-label fw-semibold">Input Colors</label>
                    <div className="mb-3">
                      <label className="form-label small">Border Color</label>
                      <input type="color" className="form-control form-control-color" defaultValue="#ced4da" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Focus Color</label>
                      <input type="color" className="form-control form-control-color" defaultValue="#22c55e" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Background Color</label>
                      <input type="color" className="form-control form-control-color" defaultValue="#ffffff" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Form Preview</label>
                    <div className="p-3 border rounded">
                      <div className="mb-3">
                        <label className="form-label">Text Input</label>
                        <input type="text" className="form-control" placeholder="Enter text..." />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Select Dropdown</label>
                        <select className="form-select">
                          <option>Choose option...</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Textarea</label>
                        <textarea className="form-control" rows="3" placeholder="Enter message..."></textarea>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label">Checkbox option</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cards Tab */}
            {activeTab === 'cards' && (
              <div>
                <h5 className="mb-4">Card & Container Styling</h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Card Appearance</label>
                    <div className="mb-3">
                      <label className="form-label small">Border Radius</label>
                      <input type="range" className="form-range" min="0" max="24" defaultValue="8" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Shadow Intensity</label>
                      <select className="form-select">
                        <option>None</option>
                        <option>Light</option>
                        <option>Medium</option>
                        <option>Strong</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Border Width</label>
                      <input type="range" className="form-range" min="0" max="4" defaultValue="1" />
                    </div>
                    
                    <label className="form-label fw-semibold">Card Colors</label>
                    <div className="mb-3">
                      <label className="form-label small">Background</label>
                      <input type="color" className="form-control form-control-color" defaultValue="#ffffff" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Border Color</label>
                      <input type="color" className="form-control form-control-color" defaultValue="#e5e7eb" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Card Preview</label>
                    <div className="p-3 border rounded">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h6 className="card-title">Sample Card Title</h6>
                          <p className="card-text small">This is a sample card with some content to show how the styling will look.</p>
                          <button className="btn btn-success btn-sm">Action</button>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header">Card with Header</div>
                        <div className="card-body">
                          <p className="card-text small mb-0">Card with header and body content.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Components Tab */}
            {activeTab === 'components' && (
              <div>
                <h5 className="mb-4">Component Styling</h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Navigation</label>
                    <div className="mb-3">
                      <label className="form-label small">Navbar Height</label>
                      <input type="range" className="form-range" min="48" max="80" defaultValue="64" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Navbar Background</label>
                      <input type="color" className="form-control form-control-color" defaultValue="#ffffff" />
                    </div>
                    
                    <label className="form-label fw-semibold">Tables</label>
                    <div className="mb-3">
                      <label className="form-label small">Row Height</label>
                      <select className="form-select">
                        <option>Compact</option>
                        <option>Default</option>
                        <option>Spacious</option>
                      </select>
                    </div>
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Striped rows</label>
                    </div>
                    
                    <label className="form-label fw-semibold">Badges & Tags</label>
                    <div className="mb-3">
                      <label className="form-label small">Badge Style</label>
                      <select className="form-select">
                        <option>Rounded</option>
                        <option>Square</option>
                        <option>Pill</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Component Preview</label>
                    <div className="p-3 border rounded">
                      <div className="mb-3">
                        <span className="badge bg-success me-2">Success</span>
                        <span className="badge bg-warning me-2">Warning</span>
                        <span className="badge bg-danger">Error</span>
                      </div>
                      
                      <div className="table-responsive mb-3">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>John Doe</td>
                              <td><span className="badge bg-success">Active</span></td>
                            </tr>
                            <tr>
                              <td>Jane Smith</td>
                              <td><span className="badge bg-warning">Pending</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="progress mb-3" style={{height: '8px'}}>
                        <div className="progress-bar bg-success" style={{width: '75%'}}></div>
                      </div>
                      
                      <div className="alert alert-success py-2" role="alert">
                        <small>Sample alert message</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Responsive Tab */}
            {activeTab === 'responsive' && (
              <div>
                <h5 className="mb-4">Responsive Settings</h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Breakpoints</label>
                    <div className="mb-3">
                      <label className="form-label small">Mobile</label>
                      <input type="number" className="form-control" defaultValue="576" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Tablet</label>
                      <input type="number" className="form-control" defaultValue="768" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Desktop</label>
                      <input type="number" className="form-control" defaultValue="992" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Mobile Optimizations</label>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Larger touch targets</label>
                    </div>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Simplified navigation</label>
                    </div>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Hide secondary content</label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="border-top pt-4 mt-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center text-muted">
                  <Info size={16} className="me-2" />
                  <small>Changes are saved automatically and applied instantly</small>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary d-flex align-items-center">
                    <RotateCcw size={16} className="me-2" />
                    Reset All
                  </button>
                  <button className="btn btn-outline-primary d-flex align-items-center">
                    <Eye size={16} className="me-2" />
                    Preview Site
                  </button>
                  <button className="btn btn-success d-flex align-items-center">
                    <Save size={16} className="me-2" />
                    Save & Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        {showPreview && (
        <div className="col-12">
          <div style={cardStyle}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">🔍 Live Preview</h5>
              <small className="text-muted">See how your changes look in real-time</small>
            </div>
            <div className="p-4 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <span>Form Elements</span>
                      <span className="badge bg-success">Active</span>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label small">Input Field</label>
                        <input type="text" className="form-control" placeholder="Sample input" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label small">Select</label>
                        <select className="form-select">
                          <option>Choose option</option>
                        </select>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm">Primary</button>
                        <button className="btn btn-outline-success btn-sm">Secondary</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h6 className="card-title">Data Display</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Sample 1</td>
                              <td><span className="badge bg-success">Done</span></td>
                            </tr>
                            <tr>
                              <td>Sample 2</td>
                              <td><span className="badge bg-warning">Pending</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-white rounded">
                    <div className="d-flex align-items-center">
                      <div style={{ width: '40px', height: '40px', backgroundColor: '#22c55e', borderRadius: '50%' }} className="me-3"></div>
                      <div>
                        <div className="fw-semibold">Navigation Component</div>
                        <small className="text-muted">Shows header/navbar styling</small>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-success">Action 1</button>
                      <button className="btn btn-sm btn-success">Action 2</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Styling;