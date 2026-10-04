import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

/**
 * Reset Demo Notes Confirmation Modal
 */
export function ResetModal({
  isOpen,
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div className="reset-modal-backdrop" role="dialog" aria-modal="true">
      <div className="reset-modal-box">
        <div className="reset-modal-header">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={22} />
            <h3 className="text-lg font-semibold text-gray-900">Reset Demo Notes?</h3>
          </div>
          <button onClick={onCancel} className="modal-close-btn" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="reset-modal-body">
          <p className="text-sm text-gray-600 mb-2">
            This will clear all custom memory notes stored in your browser local storage.
          </p>
          <p className="text-xs text-gray-500">
            Initial default photo metadata will remain untouched. This action cannot be undone.
          </p>
        </div>

        <div className="reset-modal-actions">
          <button
            className="modal-btn cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="modal-btn confirm-danger"
            onClick={onConfirm}
          >
            <Trash2 size={16} className="mr-1 inline" />
            Reset Notes
          </button>
        </div>
      </div>
    </div>
  );
}
