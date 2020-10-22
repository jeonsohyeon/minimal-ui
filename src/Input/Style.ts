import styled from 'styled-components';

export const InputWrap = styled.div<{ width?: number; height?: number }>`
  display: inline-block;
  overflow: hidden;
  input {
    width: ${({ width }) => (width ? `${width}px` : `100%`)};
    height: ${({ height }) => (height ? `${height}px` : `100%`)};
  }
`;
