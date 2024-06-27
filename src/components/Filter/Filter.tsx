import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { applySizeFilter } from '../../productActions';
// @ts-ignore
import { ProductState } from '../../productReducer';
import * as S from './style';

export const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: ProductState) => {
    console.log('state',state);
    return state.filters
  });
  console.log('filters', filters);
  const selectedCheckboxes = new Set(filters);

  const toggleCheckbox = (label: string) => {
    if (selectedCheckboxes.has(label)) {
      selectedCheckboxes.delete(label);
    } else {
      selectedCheckboxes.add(label);
    }

    const filters = Array.from(selectedCheckboxes) as string[];

    dispatch(applySizeFilter(filters));
  };

  const createCheckbox = (label: string) => (
    <S.Checkbox label={label} handleOnChange={() => toggleCheckbox(label)} key={label} />
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
