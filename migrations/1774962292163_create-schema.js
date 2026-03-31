exports.up = (pgm) => {
  pgm.createSchema('llmn');
};

exports.down = (pgm) => {
  pgm.dropSchema('llmn', { cascade: true });
};
