/**
 * NexusHack 2026 - AWS API Gateway Service Layer
 *
 * DynamoDB returns native AttributeValue format:
 *   { "track_id": { "S": "aiml" }, "available_seats": { "N": "50" } }
 *
 * The unmarshaller below unwraps those type descriptors, then the
 * normalizers map snake_case → camelCase for React components.
 */

const API_BASE_URL = "https://4zddbbkj2g.execute-api.ap-south-1.amazonaws.com";

// ---------------------------------------------------------------------------
// DynamoDB AttributeValue Unmarshaller
// Converts raw DynamoDB types to plain JS values.
//
// Supported types:
//   S    → string
//   N    → number
//   BOOL → boolean
//   NULL → null
//   L    → array  (each element recursively unmarshalled)
//   M    → object (each value recursively unmarshalled)
//   SS   → string[]
//   NS   → number[]
// ---------------------------------------------------------------------------
function unmarshallValue(attr) {
  if (attr === null || attr === undefined) return null;

  if ('S' in attr) return attr.S;
  if ('N' in attr) return Number(attr.N);
  if ('BOOL' in attr) return attr.BOOL;
  if ('NULL' in attr) return null;
  if ('SS' in attr) return attr.SS;
  if ('NS' in attr) return attr.NS.map(Number);

  if ('L' in attr) return attr.L.map(unmarshallValue);

  if ('M' in attr) {
    const result = {};
    for (const [k, v] of Object.entries(attr.M)) {
      result[k] = unmarshallValue(v);
    }
    return result;
  }

  // Already a plain JS value (Lambda may have pre-unmarshalled it)
  return attr;
}

/**
 * Converts a full DynamoDB Item (all top-level keys are AttributeValues)
 * into a plain JS object.
 *
 * Example input:
 *   { track_id: { S: "aiml" }, available_seats: { N: "50" } }
 *
 * Example output:
 *   { track_id: "aiml", available_seats: 50 }
 */
function unmarshall(item) {
  if (!item || typeof item !== 'object') return item;

  // If none of the values look like DynamoDB AttributeValues, return as-is
  // (handles the case where Lambda already unmarshalled the data)
  const firstVal = Object.values(item)[0];
  const isDynamoFormat =
    firstVal !== null &&
    typeof firstVal === 'object' &&
    ('S' in firstVal || 'N' in firstVal || 'BOOL' in firstVal ||
      'L' in firstVal || 'M' in firstVal || 'NULL' in firstVal);

  if (!isDynamoFormat) return item;

  const result = {};
  for (const [k, v] of Object.entries(item)) {
    result[k] = unmarshallValue(v);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Generic fetch wrapper
// ---------------------------------------------------------------------------
async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    const message =
      body?.message || body?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body;
}

// ---------------------------------------------------------------------------
// Normalizer: Track
//
// After unmarshalling DynamoDB types, maps snake_case → camelCase:
//   track_id        →  id
//   track_name      →  name
//   description     →  description    (same)
//   icon_name       →  iconName
//   total_seats     →  totalSeats
//   available_seats →  seatsLeft
//   tags            →  tags           (same)
//   accent_color    →  accentColor
// ---------------------------------------------------------------------------
function normalizeTrack(rawDynamo) {
  const d = unmarshall(rawDynamo);
  return {
    id: d.track_id,
    name: d.track_name,
    description: d.description ?? '',
    iconName: d.icon_name ?? 'Code',
    totalSeats: Number(d.total_seats ?? 0),
    seatsLeft: Number(d.available_seats ?? 0),
    tags: d.tags ?? [],
    accentColor: d.accent_color ?? 'cyan',
  };
}

// ---------------------------------------------------------------------------
// Normalizer: fetchSeatCounts() response
//
// Lambda shape (items array + optional totals):
//   { items: [...], total_capacity: 230, total_remaining: 62 }
//
// React EventContext expects:
//   { tracks: [...], totalCapacity: 230, totalRemaining: 62 }
// ---------------------------------------------------------------------------
function normalizeSeatCountsResponse(raw) {
  const rawTracks = raw.items ?? raw.tracks ?? [];
  const tracks = rawTracks.map(normalizeTrack);

  const totalCapacity = Number(raw.total_capacity ?? 0)
    || tracks.reduce((s, t) => s + t.totalSeats, 0);
  const totalRemaining = Number(raw.total_remaining ?? 0)
    || tracks.reduce((s, t) => s + t.seatsLeft, 0);

  return { tracks, totalCapacity, totalRemaining };
}

// ---------------------------------------------------------------------------
// Normalizer: Attendee / Ticket
//
// After unmarshalling DynamoDB types, maps snake_case → camelCase:
//   ticket_id     →  ticketId
//   full_name     →  fullName
//   email         →  email          (same)
//   organization  →  organization   (same)
//   track_id      →  trackId
//   track_name    →  trackName
//   tech_stack    →  techStack
//   registered_at →  registeredAt
// ---------------------------------------------------------------------------
function normalizeAttendee(rawDynamo) {
  const d = unmarshall(rawDynamo);
  return {
    ticketId: d.ticket_id,
    fullName: d.full_name,
    email: d.email,
    organization: d.organization,
    trackId: d.track_id,
    trackName: d.track_name ?? d.track_id ?? '',
    techStack: d.tech_stack ?? [],
    registeredAt: d.registered_at,
  };
}

// ---------------------------------------------------------------------------
// Public ApiService — identical interface to the former mock layer
// ---------------------------------------------------------------------------
export const ApiService = {
  /**
   * GET /event
   * Returns raw event metadata.
   */
  async fetchEventDetails() {
    return apiFetch('/event');
  },

  /**
   * GET /tracks
   * Returns normalized tracks with live seat counts.
   * Output: { tracks: [...], totalCapacity: number, totalRemaining: number }
   */
  async fetchSeatCounts() {
    const raw = await apiFetch('/tracks');
    return normalizeSeatCountsResponse(raw);
  },

  /**
   * GET /attendees/check?email=<email>
   * Duplicate-email pre-check.
   *
   * Lambda returns:
   *   { is_registered: { BOOL: true }, existing_attendee: { M: {...} } | { NULL: true } }
   *
   * Output: { isRegistered: boolean, existingAttendee: object | null }
   */
  async checkEmailRegistered(email) {
    if (!email || typeof email !== 'string') {
      return { isRegistered: false, existingAttendee: null };
    }

    const encoded = encodeURIComponent(email.trim().toLowerCase());
    const raw = await apiFetch(`/attendees/check?email=${encoded}`);
    const d = unmarshall(raw);

    return {
      isRegistered: Boolean(d.is_registered),
      existingAttendee: d.existing_attendee
        ? normalizeAttendee(d.existing_attendee)
        : null,
    };
  },

  /**
   * POST /attendees/register
   * Payload sent in snake_case to match DynamoDB attribute names.
   *
   * Lambda returns: { ticket: <DynamoDB attendee item> }
   * Output:         { success: true, ticket: <normalized attendee> }
   */
  async handleRegistration(payload) {
    const { fullName, email, organization, trackId, techStack } = payload;

    if (!fullName || !email || !organization || !trackId) {
      throw new Error('All required fields must be completed.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address format.');
    }

    const raw = await apiFetch('/attendees/register', {
      method: 'POST',
      body: JSON.stringify({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        organization: organization.trim(),
        track_id: trackId,
        tech_stack: techStack || [],
      }),
    });

    return {
      success: raw.success ?? true,
      ticket: normalizeAttendee(raw.ticket ?? raw),
    };
  },

  /**
   * GET /attendees/lookup?q=<email_or_ticket_id>
   * Returns normalized attendee or null if not found.
   */
  async getAttendeeLookup(query) {
    if (!query) return null;

    const encoded = encodeURIComponent(query.trim().toLowerCase());
    try {
      const raw = await apiFetch(`/attendees/lookup?q=${encoded}`);
      return raw ? normalizeAttendee(raw) : null;
    } catch (err) {
      if (err.message.includes('404') || err.message.toLowerCase().includes('not found')) {
        return null;
      }
      throw err;
    }
  },

  /**
   * POST /admin/reset  (dev/demo only — remove before production)
   */
  async resetMockState() {
    return apiFetch('/admin/reset', { method: 'POST' });
  },
};
