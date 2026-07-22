// src/services/contactService.ts

export interface Contact {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
}

// API response type
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * GET /api/contacts
 * Get all contacts
 */
export async function getContacts(): Promise<Contact[]> {
  const response = await fetch("/api/contacts");

  const result =
    (await response.json()) as ApiResponse<Contact[]>;

  if (!response.ok) {
    throw new Error(
      result.message ?? "Failed to fetch contacts"
    );
  }

  return result.data;
}

/**
 * GET /api/contacts/:id
 * Get one contact
 */
export async function getContact(
  id: number
): Promise<Contact> {
  const response = await fetch(
    `/api/contacts/${id}`
  );

  const result =
    (await response.json()) as ApiResponse<Contact>;

  if (!response.ok) {
    throw new Error(
      result.message ?? "Failed to fetch contact"
    );
  }

  return result.data;
}

/**
 * POST /api/contacts
 * Create a new contact
 */
export async function createContact(
  data: Omit<Contact, "id">
): Promise<Contact> {
  const response = await fetch(
    "/api/contacts",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  const result =
    (await response.json()) as ApiResponse<Contact>;

  if (!response.ok) {
    throw new Error(
      result.message ?? "Failed to create contact"
    );
  }

  return result.data;
}

/**
 * PUT /api/contacts/:id
 * Update an existing contact
 */
export async function updateContact(
  id: number,
  data: Omit<Contact, "id">
): Promise<Contact> {
  const response = await fetch(
    `/api/contacts/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  const result =
    (await response.json()) as ApiResponse<Contact>;

  if (!response.ok) {
    throw new Error(
      result.message ?? "Failed to update contact"
    );
  }

  return result.data;
}

/**
 * DELETE /api/contacts/:id
 * Delete a contact
 */
export async function deleteContact(
  id: number
): Promise<void> {
  const response = await fetch(
    `/api/contacts/${id}`,
    {
      method: "DELETE",
    }
  );

  const result =
    (await response.json()) as ApiResponse<null>;

  if (!response.ok) {
    throw new Error(
      result.message ?? "Failed to delete contact"
    );
  }
}