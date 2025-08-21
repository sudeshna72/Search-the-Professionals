import React, { useState } from "react";

import "./Skills.css";

interface SkillsProps {
  skills?: string[];
  isCurrentUser: boolean;
  onAddSkill: (skill: string) => Promise<void>;
  onDeleteSkill: (skill: string) => Promise<void>;
}

export default function Skills({
  skills = [],
  isCurrentUser,
  onAddSkill,
  onDeleteSkill,
}: SkillsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const openAddModal = () => {
    setModalType("add");
    setNewSkill("");
    setModalOpen(true);
  };

  const openEditModal = (skill: string) => {
    setModalType("edit");
    setSelectedSkill(skill);
    setNewSkill(skill);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!newSkill.trim()) return;
    setLoading(true);
    setError(null);
    try {
      if (modalType === "add") {
        await onAddSkill(newSkill.trim());
      } else if (modalType === "edit" && selectedSkill) {
        await onDeleteSkill(selectedSkill);
        await onAddSkill(newSkill.trim());
      }
      setModalOpen(false);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedSkill) return;
    setLoading(true);
    setError(null);
    try {
      await onDeleteSkill(selectedSkill);
      setModalOpen(false);
    } catch {
      setError("Failed to delete skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-section">
      {/* Header */}
      <div className="skills-header">
        <h3>Skills</h3>
        {isCurrentUser && (
          <div className="header-actions">
            <button className="icon-btn" onClick={openAddModal}>
            
            </button>
            {skills.length > 0 && (
              <button
                className={`icon-btn ${editMode ? "active" : ""}`}
                onClick={() => setEditMode(!editMode)}
              >
                
              </button>
            )}
          </div>
        )}
      </div>

      {/* Skills List */}
      {skills.length > 0 ? (
        <ul className="skills-list">
          {skills.map((skill) => (
            <li key={skill} className="skill-item">
              <span>{skill}</span>
              {isCurrentUser && editMode && (
                <button
                  className="icon-btn small"
                  onClick={() => openEditModal(skill)}
                >
                 
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No skills added yet.</p>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{modalType === "add" ? "Add Skill" : "Edit Skill"}</h4>

            <label className="modal-label">Skill</label>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g. JavaScript"
              disabled={loading}
            />

            {error && <p className="error-text">{error}</p>}

            <div className="modal-actions">
              <button onClick={() => setModalOpen(false)}>Cancel</button>
              {modalType === "edit" && (
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="delete-btn"
                >
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
