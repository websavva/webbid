import type { FC, CSSProperties } from 'react';

export function defineEmailComponent<Props extends { style?: CSSProperties }>(
  Component: FC<Props>,
  defaultProps: Props
) {
  const CustomizedComponent = ({ style, ...props }: Props) => {
    const mergedProps = {
      ...defaultProps,
      ...props,
      style: {
        ...defaultProps.style,
        ...style,
      },
    } as Props;

    return <Component {...mergedProps} />;
  };

  CustomizedComponent.displayName = Component.displayName;

  return CustomizedComponent;
}
