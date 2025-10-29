import { EventEmitter } from 'events';

export const mockBus = new EventEmitter();

const now = () => new Date().toISOString();
const genId = () => Math.random().toString(36).slice(2, 10);

const mockNotes = {};

function seed() {
  const id1 = genId();
  mockNotes[id1] = {
    id: id1,
    title: 'Project Kickoff Meeting',
    content:
      'Kickoff meeting notes. Action items: create timeline, assign roles, schedule follow-up.',
    createdAt: now(),
    updatedAt: now(),
    tags: ['work', 'meeting'],
    attachments: [],
    status: 'complete',
    moments: [
      {
        id: genId(),
        title: 'Follow-up meeting in 3 days',
        type: 'event',
        date: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
      },
    ],
  };
}

seed();

export const MockDB = {
  list() {
    return Object.values(mockNotes).sort((a, b) =>
      a.updatedAt < b.updatedAt ? 1 : -1
    );
  },
  get(id) {
    return mockNotes[id] ?? null;
  },
  create(input) {
    const id = genId();
    const title =
      input.title || input.content?.split('\n')[0]?.slice(0, 60) || 'Untitled';
    const note = {
      id,
      title,
      content: input.content ?? '',
      createdAt: now(),
      updatedAt: now(),
      tags: input.tags ?? [],
      attachments: input.attachments ?? [],
      status: 'processing',
      moments: [],
    };
    mockNotes[id] = note;
    mockBus.emit('notes/created', note);

    setTimeout(() => {
      const done = mockNotes[id];
      if (!done) return;
      done.status = 'complete';
      done.updatedAt = now();
      done.moments.push({
        id: genId(),
        title: 'Auto reminder: review note in 24h',
        type: 'reminder',
        reminderOffset: 24 * 3600,
      });
      mockBus.emit('notes/updated', done);
    }, 2000);

    return note;
  },
  update(id, patch) {
    const current = mockNotes[id];
    if (!current) return null;
    mockNotes[id] = { ...current, ...patch, updatedAt: now() };
    mockBus.emit('notes/updated', mockNotes[id]);
    return mockNotes[id];
  },
  delete(id) {
    const existed = Boolean(mockNotes[id]);
    delete mockNotes[id];
    if (existed) mockBus.emit('notes/deleted', id);
    return existed;
  },
};
