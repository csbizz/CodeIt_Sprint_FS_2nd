import { useState } from 'react';
import FileInput from './FileInput';
import useAsync from '../hooks/useAsync';
import useTranslate from '../hooks/useTranslate';

const INITIAL_VALUES = Object.freeze({
  title: '',
  calorie: 0,
  content: '',
  imgFile: null
});

function FoodForm({
  initialValues = INITIAL_VALUES,
  initialPreview = null,
  onSubmit,
  onSubmitSuccess,
  onCancel
}) {
  const [isLoading, submitErr, onSubmitAsync] = useAsync(onSubmit);
  const [values, setValues] = useState(initialValues);
  const translate = useTranslate();

  const addValue = (name, value) => {
    setValues((vals) => ({
      ...vals,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('calorie', values.calorie);
    formData.append('content', values.content);
    formData.append('imgFile', values.imgFile);

    const res = await onSubmitAsync(formData);
    if (!res) return;

    const { food } = res;
    onSubmitSuccess(food);
    setValues(INITIAL_VALUES);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    let value;
    switch (name) {
      case 'calorie':
        value = Number(e.target.value) || 0;
        break;
      default:
        value = e.target.value;
    }

    addValue(name, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={addValue}
      />
      <input name="title" value={values.title} onChange={handleChange}></input>
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleChange}
      ></input>
      <textarea
        name="content"
        value={values.content}
        onChange={handleChange}
      ></textarea>
      <button disabled={isLoading} type="submit">
        {translate('confirm')}
      </button>
      {onCancel && <button onClick={onCancel}>{translate('cancel')}</button>}
      {submitErr?.message && <div>{submitErr.message}</div>}
    </form>
  );
}

export default FoodForm;
