import * as React from 'react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { TextInput } from './TextInput';

export default {
  title: 'components|Input',
  component: TextInput,
  decorators: [withKnobs],
};

export const TEXT = () => {
  return (
    <TextInput
      label={text('label', 'label text')}
      value={text('value', 'Text Input')}
      onChange={action('onChange')}
      width={number('width', 100)}
      height={number('height', 30)}
    />
  );
};
