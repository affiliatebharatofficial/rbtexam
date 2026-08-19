import { DELETED_CARD_IDS } from './flashcard-bank';

/**
 * Server-side flashcard memory synchronization
 * Node fs file persistence has been removed for Cloudflare Worker edge compatibility.
 * Supabase PostgreSQL `deleted_at` column is the single source of truth.
 */
export function loadDeletedCardIdsServer(): void {
  // No-op: Supabase queries filter with `.is('deleted_at', null)`
}

export function saveDeletedCardIdsServer(): void {
  // No-op: Supabase mutations set `deleted_at: new Date().toISOString()`
}
