import { useLocale } from '../contexts/LocaleContext';

const DICTIONARY = Object.freeze({
  KO: {
    confirm: '확인',
    cancel: '취소',
    edit: '수정',
    delete: '삭제',
    search: '검색',
    newest: '최신순',
    calorie: '칼로리순',
    more: '더 보기'
  },
  EN: {
    confirm: 'OK',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    newest: 'Newest',
    calorie: 'Calorie',
    more: 'More'
  }
});

function useTranslate() {
  const locale = useLocale();
  const t = (key) => DICTIONARY[locale][key] || '';
  return t;
}

export default useTranslate;
