import React from 'react';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import Check, { CheckProps } from '../common/Check';
import CheckboxGroup from './CheckboxGroup';
import { checkboxDefaultProps } from './defaultProps';

export type CheckboxProps = Omit<CheckProps, 'type'>;

const Checkbox = forwardRefWithStatics<CheckboxProps, HTMLLabelElement>(
  (props, ref) => <Check ref={ref} type="checkbox" {...props} />,
  { Group: CheckboxGroup },
);

Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = checkboxDefaultProps;

export default Checkbox;
