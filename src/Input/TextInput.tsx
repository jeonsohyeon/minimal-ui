import * as React from 'react';
import { InputWrap } from './Style';

interface ITextInput {
  label?: string;
  value: string;
  id?: string;
  onChange?: (...args: any) => void;
  width?: number;
  height?: number;
}

export const TextInput = (props: ITextInput) => {
  const { label, id, value = '', width, height, onChange } = props;

  const onChangeHandler = (e: any) => {
    onChange && onChange(e.currentTarget.value);
  };

  return (
    <InputWrap {...(width && { width: width })} {...(height && { height: height })}>
      {label && <label {...(id && { htmlFor: id })}>{label}</label>}
      <input type="text" {...(id && { id: id })} value={value} onChange={onChangeHandler} />
    </InputWrap>
  );
};
