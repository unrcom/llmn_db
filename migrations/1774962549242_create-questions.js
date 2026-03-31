exports.up = (pgm) => {
  pgm.createTable({ schema: 'llmn', name: 'questions' }, {
    id: { type: 'serial', primaryKey: true },
    poc_id: { type: 'integer', notNull: true, references: { schema: 'llmn', name: 'poc' } },
    question: { type: 'text', notNull: true },
    training_role: { type: 'integer' },
    status: { type: 'varchar(20)', notNull: true, default: "'active'" },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: 'llmn', name: 'questions' });
};
