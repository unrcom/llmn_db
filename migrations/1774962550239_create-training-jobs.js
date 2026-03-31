exports.up = (pgm) => {
  pgm.createTable({ schema: 'llmn', name: 'training_jobs' }, {
    id: { type: 'serial', primaryKey: true },
    poc_id: { type: 'integer', notNull: true, references: { schema: 'llmn', name: 'poc' } },
    question_sets_id: { type: 'integer', references: { schema: 'llmn', name: 'question_sets' } },
    name: { type: 'varchar(100)', notNull: true },
    status: { type: 'varchar(20)', notNull: true },
    training_mode: { type: 'smallint', notNull: true, default: 1 },
    iters: { type: 'integer', notNull: true, default: 1000 },
    batch_size: { type: 'integer', notNull: true, default: 4 },
    learning_rate: { type: 'double precision', notNull: true, default: 0.00001 },
    num_layers: { type: 'integer', notNull: true, default: 16 },
    max_seq_length: { type: 'integer', notNull: true, default: 2048 },
    loss_threshold: { type: 'double precision' },
    output_model_name: { type: 'varchar(200)' },
    instance_id: { type: 'varchar(100)' },
    error_message: { type: 'text' },
    started_at: { type: 'timestamp' },
    finished_at: { type: 'timestamp' },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: 'llmn', name: 'training_jobs' });
};
