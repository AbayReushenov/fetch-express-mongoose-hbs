const {
  connect, disconnect, Schema, model, pluralize,
} = require('mongoose');

pluralize(null);

const goodsSchema = new Schema({
  name: String,
  price: Number,
  currency: String,
  count: Number,
});

module.exports = { connect, disconnect, Good: model('goods', goodsSchema) };
