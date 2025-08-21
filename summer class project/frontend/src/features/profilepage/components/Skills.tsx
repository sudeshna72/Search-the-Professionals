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
  const [newSkill, setNewSkill] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!newSkill.trim()) {
      setError("Skill cannot be empty");
      return;
    }
    setLoading(true);
    try {
      await onAddSkill(newSkill.trim());
      setNewSkill("");
    } catch {
      setError("Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!newSkill.trim() || !selectedSkill) return;
    setLoading(true);
    try {
      await onDeleteSkill(selectedSkill);
      await onAddSkill(newSkill.trim());
      setNewSkill("");
      setSelectedSkill(null);
    } catch {
      setError("Failed to save skill");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (skill: string) => {
    setLoading(true);
    try {
      await onDeleteSkill(skill);
      if (selectedSkill === skill) setSelectedSkill(null);
    } catch {
      setError("Failed to delete skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-section">
      <div className="skills-header">
        <h3>Skills</h3>
        {isCurrentUser && (
          <button className="icon-btn manage-btn" onClick={() => setModalOpen(true)}>
            ⚙️ Manage Skills
          </button>
        )}
      </div>

      {/* Skills list */}
      {skills.length > 0 ? (
        <ul className="skills-list">
          {skills.map((skill) => (
            <li key={skill} className="skill-item">
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No skills added yet.</p>
      )}

      {/* Modal for managing skills */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Manage Skills</h4>

            {/* Add new skill */}
            <div className="modal-row">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill"
                disabled={loading}
              />
              <button onClick={handleAdd} disabled={loading}>
                ➕ Add
              </button>
            </div>

            {/* Edit existing skills */}
            <ul className="skills-list vertical">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className={`skill-item ${selectedSkill === skill ? "active" : ""}`}
                  onClick={() => {
                    setSelectedSkill(skill);
                    setNewSkill(skill);
                  }}
                >
                  <span>{skill}</span>
                  <button
                    className="delete-btn small"
                    onClick={() => handleDelete(skill)}
                    disabled={loading}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>

            {selectedSkill && (
              <div className="modal-row">
                <button onClick={handleSave} disabled={loading}>
                  💾 Save Changes
                </button>
              </div>
            )}

            {error && <p className="error-text">{error}</p>}

            <div className="modal-actions">
              <button onClick={() => setModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
