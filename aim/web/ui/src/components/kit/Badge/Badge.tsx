import React from 'react';
import styled from 'styled-components';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

import { Icon } from '../index';

import { IBadgeProps } from './Badge.d';

import './Badge.scss';

const getBadgeColor: (color: string) => string = (color: string): string =>
  `background-color: ${color}1a;
   color: ${color}; 
   border: 0.0625rem solid ${color};`;

const BadgeContainer: any = styled.div`
  font-family: ${(props: any) =>
    props.monospace ? '"Iosevka", monospace' : 'Inter, sans-serif'};
  ${({ color }) => color && getBadgeColor(color)}
`;

const BadgeIcon = styled.span`
  ${(props) =>
    props.color &&
    `&:hover {
    background-color: ${props.color}2a}
  }`}
`;

/**
 * @property {string} id - id of Badge
 * @property {string} label - label of Badge
 * @property {string} color - Badge color
 * @property {string} size - size of Badge
 * @property {maxWidth} string - maximum width of Badge
 * @property {React.CSSProperties} style - applies inline styles
 * @property {string} className - component className
 * @property {boolean} selectBadge - defines if Badge renders in Select component
 * @property {function} onDelete - delete callBack function
 * @property {function}  onClick - handling on Badge click function
 */
function Badge({
  id,
  label,
  color = '',
  size = 'medium',
  style,
  className = '',
  startIcon,
  maxWidth = '100%',
  monospace = false,
  selectBadge,
  onDelete,
  onClick,
}: IBadgeProps): React.FunctionComponentElement<React.ReactNode> {
  return (
    <ErrorBoundary>
      <BadgeContainer
        id={id}
        color={color}
        style={{
          ...style,
          maxWidth,
        }}
        role='button'
        monospace={monospace}
        className={`Badge Badge${'__' + size} ${className} ${
          color ? '' : 'Badge__default'
        } ${selectBadge ? 'Badge__select' : ''}`}
        data-name={label}
        onClick={onClick}
      >
        {startIcon && (
          <span className='Badge__startIcon'>
            <Icon color={color} name={startIcon} />
          </span>
        )}
        <span className='Badge__label'>{label}</span>
        {onDelete && (
          <BadgeIcon
            color={color}
            onClick={() => onDelete(label)}
            className='Badge__deleteIcon'
          >
            <Icon color={color} name='close' />
          </BadgeIcon>
        )}
      </BadgeContainer>
    </ErrorBoundary>
  );
}

Badge.displayName = 'Badge';

export default Badge;
