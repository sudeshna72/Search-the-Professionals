import React, { useState, useEffect } from "react";
import "./About.css";

interface AboutProps {
  aboutText: string | undefined;
  isCurrentUser: boolean;
  onSave: (newAbout: string) => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function About({ aboutText, isCurrentUser, onSave, onDelete }: AboutProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newAbout, setNewAbout] = useState(aboutText || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNewAbout(aboutText || "");
  }, [aboutText]);

  const handleSave = async () => {
    if (!newAbout.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      await onSave(newAbout);
      setIsPopupOpen(false);
    } catch (e) {
      setError("❌ Failed to save changes.");
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await onDelete();
      setIsPopupOpen(false);
    } catch (e) {
      setError("❌ Failed to delete.");
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-section">
      <h3>About</h3>

      <p>{aboutText || "No information available"}</p>

      {isCurrentUser && (
        <button className="manage-btn" onClick={() => setIsPopupOpen(true)}>
          ⚙ Manage About
        </button>
      )}

      {isPopupOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h2>Manage About</h2>
              <button
                className="close-btn"
                onClick={() => setIsPopupOpen(false)}
              >
                ✖
              </button>
            </div>

            {/* Body */}
            <textarea
              value={newAbout}
              onChange={(e) => setNewAbout(e.target.value)}
              rows={6}
              disabled={isSaving}
              className="modal-textarea"
              placeholder="Write something about yourself..."
            />
            {error && <p className="error-text">{error}</p>}

            {/* Footer */}
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setIsPopupOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
                disabled={isSaving || !newAbout.trim()}
              >
                {aboutText ? (isSaving ? "Saving..." : "Save Changes") : (isSaving ? "Adding..." : "Add")}
              </button>

              <button
                className="delete-btn"
                onClick={handleDelete}
                disabled={isSaving || !aboutText}
              >
                {isSaving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
