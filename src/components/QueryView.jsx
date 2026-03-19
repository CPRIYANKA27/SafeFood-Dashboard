import React, { useState } from "react";

export default function QueryView({ supplier }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    supplier: "",
    queryType: "Documentation Request",
    title: "",
    description: "",
    priority: "Medium (Important)",
    dueDate: "",
    attachments: [],
  });

  const templates = [
    {
      id: "allergen",
      icon: "⚠️",
      name: "Allergen Declaration",
      description: "Request updated allergen matrices or declarations.",
    },
    {
      id: "haccp",
      icon: "✓",
      name: "HACCP Certificate",
      description: "Request renewal or submission of HACCP certification.",
    },
    {
      id: "capa",
      icon: "📋",
      name: "Audit CAPA",
      description: "Corrective and Preventive Actions follow-up post audit.",
    },
    {
      id: "custom",
      icon: "📝",
      name: "Custom Query",
      description: "Create a new query from scratch.",
    },
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Query submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="query-view">
      <div className="query-header-section">
        <h2 className="query-title">Raise New Query</h2>
        <p className="query-subtitle">
          Send a request for documentation or compliance checks to a supplier.
        </p>
      </div>

      {!selectedTemplate ? (
        <section className="templates-section">
          <h3 className="section-title">Quick Templates</h3>
          <div className="templates-grid">
            {templates.map((template) => (
              <button
                key={template.id}
                className="template-card"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <span className="template-icon">{template.icon}</span>
                <h4 className="template-name">{template.name}</h4>
                <p className="template-description">{template.description}</p>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <form className="query-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Supplier <span className="required">*</span>
            </label>
            <select
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
              className="form-input select"
            >
              <option value="">Select a supplier...</option>
              <option value="freshfarms">{supplier.name}</option>
              <option value="other">Other Supplier</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Query Type <span className="required">*</span>
            </label>
            <select
              name="queryType"
              value={formData.queryType}
              onChange={handleInputChange}
              className="form-input select"
            >
              <option>Documentation Request</option>
              <option>Compliance Check</option>
              <option>Certificate Update</option>
              <option>Incident Report</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Query Title <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Updated Allergen Matrix needed for 2025"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Detailed Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide specific details about what is required from the supplier..."
            className="form-input textarea"
            rows="5"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Priority Level</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="form-input select"
            >
              <option>Low</option>
              <option>Medium (Important)</option>
              <option>High (Urgent)</option>
              <option>Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Due Date <span className="required">*</span>
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="form-input"
              placeholder="dd-mm-yyyy"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Attachments</label>
          <div className="upload-area">
            <label className="upload-label">
              <div className="upload-content">
                <span className="upload-icon">☁️</span>
                <p className="upload-text">
                  <span className="upload-link">Upload a file</span> or drag and
                  drop
                </p>
                <p className="upload-hint">PDF, DOCX, PNG, JPG up to 10MB</p>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="file-input"
                accept=".pdf,.docx,.png,.jpg,.jpeg"
              />
            </label>
          </div>

          {formData.attachments.length > 0 && (
            <div className="attachments-list">
              {formData.attachments.map((file, index) => (
                <div key={index} className="attachment-item">
                  <span className="attachment-icon">📎</span>
                  <span className="attachment-name">{file.name}</span>
                  <button
                    type="button"
                    className="attachment-remove"
                    onClick={() => removeAttachment(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Submit Query
          </button>
        </div>
      </form>
    </div>
  );
}
