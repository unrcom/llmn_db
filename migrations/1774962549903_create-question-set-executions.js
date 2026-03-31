exports.up = (pgm) => {
  pgm.createTable({ schema: 'llmn', name: 'question_set_executions' }, {
    id: { type: 'serial', primaryKey: true },
    question_sets_id: { type: 'integer', notNull: true, references: { schema: 'llmn', name: 'question_sets' } },
    models_id: { type: 'integer', notNull: true, references: { schema: 'llmn', name: 'models' } },
    status: { type: 'smallint', notNull: true, default: 1 },
    executed_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
    finished_at: { type: 'timestamp' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: 'llmn', name: 'question_set_executions' });
};
