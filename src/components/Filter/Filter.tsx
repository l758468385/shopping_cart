import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSizesFilter } from 'store/slices/productsSlice';
import * as S from './style';
import { RootState } from '../../store';

export const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

const Filter = () => {
  const dispatch = useDispatch();
  const filterSizes = useSelector((state:RootState) => state.products.filterSizes);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set<string>(filterSizes));

  const toggleCheckbox = (label: string) => {
    const updatedCheckboxes = new Set(selectedCheckboxes);
    if (updatedCheckboxes.has(label)) {
      updatedCheckboxes.delete(label);
    } else {
      updatedCheckboxes.add(label);
    }
    setSelectedCheckboxes(updatedCheckboxes);

    // 将 Set 转换为数组，更新筛选器
    const updatedFilters = Array.from(updatedCheckboxes);
    dispatch(setSizesFilter(updatedFilters));
  };

  const createCheckbox = (label: string) => (
    <S.Checkbox label={label} handleOnChange={toggleCheckbox} key={label} />
  );

  const createCheckboxes = () => availableSizes.map(createCheckbox);

  return (
    <S.Container>
      <S.Title>Sizes:</S.Title>
      {createCheckboxes()}
    </S.Container>
  );
};

export default Filter;
