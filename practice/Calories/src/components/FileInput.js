import { useEffect, useRef, useState } from 'react';

function FileInput({ name, value, initialPreview = null, onChange }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(initialPreview);

  const handleChange = (e) => {
    const value = e.target.files[0];

    onChange(name, value);
  };
  const handleClearClick = () => {
    const inputNode = inputRef?.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const imgUrl = URL.createObjectURL(value);
    setPreview(imgUrl);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(imgUrl);
    };
  }, [value, initialPreview]);

  return (
    <div>
      <img src={preview} alt="preview" />
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button type="button" onClick={handleClearClick}>
          X
        </button>
      )}
    </div>
  );
}

export default FileInput;
