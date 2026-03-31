exports.up = (pgm) => {
  pgm.createTable({ schema: 'llmn', name: 'question_set_execution_results' }, {
    id: { type: 'serial', primaryKey: true },
    question_set_executions_id: { type: 'integer', notNull: true, references: { schema: 'llmn', name: 'question_set_executions' } },
    questions_id: { type: 'integer', notNull: true, references: { schema: 'llmn', name: 'questions' } },
    answers_id: { type: 'integer', references: { schema: 'llmn', name: 'answers' } },
    status: { type: 'smallint', notNull: true, default: 1 },
  });
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: 'llmn', name: 'question_set_execution_results' });
};
