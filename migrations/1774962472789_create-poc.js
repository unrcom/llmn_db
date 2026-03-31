exports.up = (pgm) => {
  pgm.createTable({ schema: 'llmn', name: 'poc' }, {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(100)', notNull: true },
    display_name: { type: 'varchar(100)', notNull: true },
    models_id: { type: 'integer', references: { schema: 'llmn', name: 'models' } },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: 'llmn', name: 'poc' });
};
