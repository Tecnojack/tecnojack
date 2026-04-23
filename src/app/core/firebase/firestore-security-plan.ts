export type FirestoreSecurityScope = 'public-read-admin-write' | 'admin-only';

export interface FirestoreSecurityRulePlan {
  collection: 'media' | 'adminUsers' | 'auditLogs';
  scope: FirestoreSecurityScope;
  allowCreate: boolean;
  allowUpdate: boolean;
  allowDelete: boolean;
}

export const FIRESTORE_ADMIN_UID_CLAIM = 'admin';

export const FIRESTORE_CMS_RULE_PLAN: readonly FirestoreSecurityRulePlan[] = [
  { collection: 'media', scope: 'public-read-admin-write', allowCreate: true, allowUpdate: true, allowDelete: false },
  { collection: 'adminUsers', scope: 'admin-only', allowCreate: false, allowUpdate: false, allowDelete: false },
  { collection: 'auditLogs', scope: 'admin-only', allowCreate: true, allowUpdate: false, allowDelete: false }
] as const;

export const FIRESTORE_RULES_TEMPLATE = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() {
      return request.auth != null;
    }

    function hasAdminClaim() {
      return isSignedIn() && request.auth.token.${FIRESTORE_ADMIN_UID_CLAIM} == true;
    }

    function isAdminUserDocument() {
      return isSignedIn() && exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }

    function isAdmin() {
      return hasAdminClaim() || isAdminUserDocument();
    }

    function canWriteCms() {
      return isAdmin();
    }

    match /{collection}/{docId} {
      allow read: if true;
      allow create, update: if canWriteCms();
      allow delete: if false;
    }

    match /adminUsers/{uid} {
      allow read: if isAdmin();
      allow write: if false;
    }

    match /auditLogs/{logId} {
      allow read: if isAdmin();
      allow create: if isAdmin();
      allow update, delete: if false;
    }
  }
}`;
