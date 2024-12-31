export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateSlackMessage(text: string | undefined, userId: string | undefined): ValidationResult {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Message text cannot be empty' };
  }

  if (!userId) {
    return { valid: false, error: 'User ID is required' };
  }

  // Add any additional validation rules here
  if (text.length > 1000) {
    return { valid: false, error: 'Message text cannot exceed 1000 characters' };
  }

  return { valid: true };
}
