import * as S from './style';

import {setSortDirection} from '../../store/slices/productsSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


const Sort = () => {

  const [sortOrder, setSortOrder] = useState<'ascending' | 'descending' | null>(null);



  const dispatch = useDispatch();

  const handleSort = (order: 'ascending' | 'descending') => {


    if(sortOrder === order) {
      setSortOrder(null)
      dispatch(setSortDirection(null));
    }else {
      setSortOrder(order)
      dispatch(setSortDirection(order))
    }
  }

  return (
    <S.Container>
      <S.Title>价格:</S.Title>
      <S.Wrap>
        <S.SortButton data-testid='price-asc' active={sortOrder === 'ascending'} onClick={() => handleSort(('ascending'))}>按价格升序</S.SortButton>
        <S.SortButton data-testid='price-desc' active={sortOrder === 'descending'} onClick={() => handleSort(('descending'))}>按价格降序</S.SortButton>
      </S.Wrap>
    </S.Container>
  );
};

export default Sort;
