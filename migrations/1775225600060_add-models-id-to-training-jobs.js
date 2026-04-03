exports.up = (pgm) => {
  pgm.addColumn({ schema: 'llmn', name: 'training_jobs' }, {
    models_id: {
      type: 'integer',
      references: { schema: 'llmn', name: 'models' },
      onDelete: 'SET NULL',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn({ schema: 'llmn', name: 'training_jobs' }, 'models_id');
};
