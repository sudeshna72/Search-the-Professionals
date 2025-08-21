import React, { useState } from "react";
import "./Experience.css";

interface ExperienceItem {
  _id?: string;
  title: string;
  company: string;
  period: string;
}

interface ExperienceProps {
  experiences?: ExperienceItem[];
  isCurrentUser: boolean;
  onAdd: (exp: ExperienceItem) => Promise<void>;
  onEdit: (id: string, updated: ExperienceItem) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function Experience({
  experiences = [],
  isCurrentUser,
  onAdd,
  onEdit,
  onDelete,
}: ExperienceProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [formData, setFormData] = useState<ExperienceItem>({
    title: "",
    company: "",
    period: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = (exp?: ExperienceItem) => {
    if (exp) {
      setSelectedExp(exp);
      setFormData(exp);
    } else {
      setSelectedExp(null);
      setFormData({ title: "", company: "", period: "" });
    }
    setError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.company || !formData.period) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    try {
      if (selectedExp) {
        await onEdit(selectedExp._id!, formData);
      } else {
        await onAdd(formData);
      }
      setModalOpen(false);
      setFormData({ title: "", company: "", period: "" });
      setSelectedExp(null);
    } catch {
      setError("Failed to save experience");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedExp && window.confirm("Are you sure you want to delete this experience?")) {
      setLoading(true);
      try {
        await onDelete(selectedExp._id!);
        setModalOpen(false);
        setFormData({ title: "", company: "", period: "" });
        setSelectedExp(null);
      } catch {
        setError("Failed to delete experience");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="profile-section">
      <div className="experience-header">
        <h3>Experience</h3>
        {isCurrentUser && (
          <button className="add-btn" onClick={() => openModal()}>
            +
          </button>
        )}
      </div>

      {experiences.length > 0 ? (
        <ul className="experience-list">
          {experiences.map((exp) => (
            <li key={exp._id || exp.title}>
              <strong>{exp.title}</strong> – {exp.company} ({exp.period})
              {isCurrentUser && (
                <button className="edit-btn" onClick={() => openModal(exp)}>
                  ✎
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No experiences added yet.</p>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{selectedExp ? "Edit Experience" : "Add Experience"}</h4>

            <label>Job Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={loading}
            />

            <label>Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              disabled={loading}
            />

            <label>Period</label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              disabled={loading}
            />

            {error && <p className="error-text">{error}</p>}

            <div className="modal-actions">
              <button onClick={() => setModalOpen(false)}>Cancel</button>
              {selectedExp && (
                <button onClick={handleDelete} className="delete-btn" disabled={loading}>
                  Delete
                </button>
              )}
              <button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
