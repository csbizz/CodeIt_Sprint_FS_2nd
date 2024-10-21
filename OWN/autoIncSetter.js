import AutoIncrementFactory from 'mongoose-sequence';

function AutoIncSetter(schema, mongoose, name, inc_field_name) {
  const AutoIncrement = AutoIncrementFactory(mongoose);
  const option = {
    id: `${name}_${inc_field_name}`,
    inc_field: `${inc_field_name}`
  };
  schema.plugin(AutoIncrement, option);
}

export default AutoIncSetter;
