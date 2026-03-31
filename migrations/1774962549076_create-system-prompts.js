exports.up = (pgm) => {
  pgm.createTable({ schema: 'llmn', name: 'system_prompts' }, {
    id: { type: 'serial', primaryKey: true },
    poc_id: { type: 'integer', notNull: true, references: { schema: 'llmn', name: 'poc' } },
    version: { type: 'integer', notNull: true, default: 1 },
    content: { type: 'text', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: 'llmn', name: 'system_prompts' });
};
