exports.up = (pgm) => {
  pgm.createTable({ schema: 'llmn', name: 'question_set_items' }, {
    question_sets_id: { type: 'integer', notNull: true, references: { schema: 'llmn', name: 'question_sets' } },
    questions_id: { type: 'integer', notNull: true, references: { schema: 'llmn', name: 'questions' } },
    order_index: { type: 'integer', notNull: true },
  });
  pgm.addConstraint({ schema: 'llmn', name: 'question_set_items' }, 'question_set_items_pkey', 'PRIMARY KEY (question_sets_id, questions_id)');
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: 'llmn', name: 'question_set_items' });
};
