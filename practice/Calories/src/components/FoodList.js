import { useState } from 'react';
import FoodListItem from './FoodListItem';
import FoodForm from './FoodForm';

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [edittingId, setEdittingId] = useState(null);

  return (
    <ul>
      {items.map((item) => {
        if (edittingId === item.id) {
          const { id, title, calorie, content, imgUrl } = item;
          const initialValues = { title, calorie, content };

          const handleSubmit = (formData) => onUpdate(id, formData);
          const handleSubmitSuccess = (food) => {
            onUpdateSuccess(food);
            setEdittingId(null);
          };
          const handleCancel = () => setEdittingId(null);

          return (
            <li key={item.id}>
              <FoodForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCancel}
              />
            </li>
          );
        }

        return (
          <li key={item.id}>
            <FoodListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEdittingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
