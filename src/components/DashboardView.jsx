import React, { useState } from "react";

export default function DashboardView({ supplier, onRaiseQuery }) {
  const [certificates] = useState([
    {
      id: 1,
      name: "HACCP Certification",
      status: "Valid",
      expiry: "2025-08-15",
      statusColor: "#10b981",
    },
    {
      id: 2,
      name: "ISO 22000",
      status: "Expiring Soon",
      expiry: "2024-11-01",
      statusColor: "#f59e0b",
    },
    {
      id: 3,
      name: "Allergen Control Policy",
      status: "Valid",
      expiry: "2026-01-20",
      statusColor: "#10b981",
    },
    {
      id: 4,
      name: "Organic Certification",
      status: "Expired",
      expiry: "2024-05-10",
      statusColor: "#ef4444",
    },
  ]);

  const [queries] = useState([
    {
      id: "Q-1042",
      title: "Traceability documentation missing",
      severity: "High",
      status: "Open",
      timestamp: "2 hrs ago",
    },
    {
      id: "Q-1041",
      title: "Allergen matrix update required",
      severity: "Medium",
      status: "In Review",
      timestamp: "1 day ago",
    },
    {
      id: "Q-1039",
      title: "Audit CAPA submission",
      severity: "High",
      status: "Resolved",
      timestamp: "3 days ago",
    },
  ]);

  const getStatusIcon = (status) => {
    const icons = {
      Valid: "✓",
      "Expiring Soon": "⚠",
      Expired: "✕",
    };
    return icons[status] || "•";
  };

  const getSeverityColor = (severity) => {
    const colors = {
      High: "#ef4444",
      Medium: "#f59e0b",
      Low: "#10b981",
    };
    return colors[severity];
  };

  return (
    <div className="dashboard-view">
      {/* Supplier Header */}
      <section className="supplier-header">
        <div className="supplier-info">
          <h2 className="supplier-name">{supplier.name}</h2>
          <span
            className={`supplier-badge ${supplier.riskLevel.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {supplier.riskLevel}
          </span>
          <p className="supplier-meta">
            Supplier ID: {supplier.supplierId} • Category: {supplier.category}
          </p>
        </div>
        <button className="btn-primary" onClick={onRaiseQuery}>
          + Raise New Query
        </button>
      </section>

      {/* KPI Cards */}
      <section className="kpi-section">
        <div className="kpi-card risk-card">
          <div className="kpi-header">
            <h3 className="kpi-label">Risk Score</h3>
            <span className="kpi-icon">🛡️</span>
          </div>
          <p className="kpi-value">A−</p>
          <p className="kpi-trend positive">↗ +2%</p>
        </div>

        <div className="kpi-card cert-card">
          <div className="kpi-header">
            <h3 className="kpi-label">Certificates</h3>
            <span className="kpi-icon">✓</span>
          </div>
          <p className="kpi-value">4 Active</p>
          <p className="kpi-alert">⚠ 1 Expires soon</p>
        </div>

        <div className="kpi-card query-card">
          <div className="kpi-header">
            <h3 className="kpi-label">Open Queries</h3>
            <span className="kpi-icon">📋</span>
          </div>
          <p className="kpi-value">12</p>
          <p className="kpi-trend increase">↑ +3 this week</p>
        </div>

        <div className="kpi-card overdue-card">
          <div className="kpi-header">
            <h3 className="kpi-label">Overdue</h3>
            <span className="kpi-icon">⏰</span>
          </div>
          <p className="kpi-value">2</p>
          <p className="kpi-trend decrease">↘ -1 from last week</p>
        </div>
      </section>

      {/* Compliance & Certificates + Recent Queries */}
      <section className="content-grid">
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Compliance & Certificates</h3>
            <a href="viewall.jsx" className="view-all-link">
              View All
            </a>
          </div>

          <div className="certificates-table">
            <div className="table-header">
              <div className="col-name">Certificate Name</div>
              <div className="col-status">Status</div>
              <div className="col-expiry">Expiry</div>
              <div className="col-actions"></div>
            </div>

            {certificates.map((cert) => (
              <div key={cert.id} className="table-row">
                <div className="col-name">{cert.name}</div>
                <div className="col-status">
                  <span
                    className={`status-badge ${cert.status.toLowerCase().replace(/\s+/g, "-")}`}
                    style={{ borderColor: cert.statusColor }}
                  >
                    {getStatusIcon(cert.status)} {cert.status}
                  </span>
                </div>
                <div className="col-expiry">{cert.expiry}</div>
                <div className="col-actions">
                  <button className="action-btn">⋮</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Recent Queries</h3>
            <a href="viewall.jsx" className="view-all-link">
              View All
            </a>
          </div>

          <div className="queries-list">
            {queries.map((query) => (
              <div key={query.id} className="query-item">
                <div className="query-header">
                  <span className="query-id">{query.id}</span>
                  <span
                    className="severity-badge"
                    style={{ color: getSeverityColor(query.severity) }}
                  >
                    {query.severity}
                  </span>
                </div>
                <p className="query-title">{query.title}</p>
                <div className="query-footer">
                  <span
                    className={`status-badge ${query.status.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    • {query.status}
                  </span>
                  <span className="query-time">{query.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
