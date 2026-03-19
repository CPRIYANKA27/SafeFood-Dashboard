import React, { useState } from "react";
import "./App.css";
import DashboardView from "./components/DashboardView";
import QueryView from "./components/QueryView";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [supplierData] = useState({
    name: "FreshFarms Inc.",
    riskLevel: "Medium Risk Supplier",
    supplierId: "SUP-88204",
    category: "Produce & Dairy",
  });

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo-icon">🛡️</div>
          <span className="logo-text">SafeFood Pro</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${currentView === "dashboard" ? "active" : ""}`}
            onClick={() => setCurrentView("dashboard")}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-item ${currentView === "queries" ? "active" : ""}`}
            onClick={() => setCurrentView("queries")}
          >
            <span className="nav-icon">📋</span>
            <span>Queries</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-btn settings">
            <span>⚙️</span> Settings
          </button>
          <button className="sidebar-btn help">
            <span>❓</span> Help
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="app-header">
          <h1 className="page-title">
            {currentView === "dashboard" ? "Supplier Dashboard" : "Raise Query"}
          </h1>
          <div className="header-right">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button className="notification-btn">
              🔔
              <span className="badge">1</span>
            </button>
            <div className="user-avatar">JD</div>
          </div>
        </header>

        {currentView === "dashboard" ? (
          <DashboardView
            supplier={supplierData}
            onRaiseQuery={() => setCurrentView("queries")}
          />
        ) : (
          <QueryView supplier={supplierData} />
        )}
      </main>
    </div>
  );
}
