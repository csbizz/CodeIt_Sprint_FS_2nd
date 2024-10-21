import useTranslate from '../hooks/useTranslate';

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, content, calorie, id, createdAt } = item;
  const translate = useTranslate();

  const handleDeleteClick = () => onDelete(id);
  const handleEditClick = () => onEdit(id);

  return (
    <div>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleEditClick}>{translate('edit')}</button>
      <button onClick={handleDeleteClick}>{translate('delete')}</button>
    </div>
  );
}

export default FoodListItem;
