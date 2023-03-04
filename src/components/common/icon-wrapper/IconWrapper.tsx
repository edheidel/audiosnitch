import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { type FC, memo } from "react";

export const IconWrapper: FC<FontAwesomeIconProps> = memo(({
  icon,
  style,
  className,
  onClick,
}) => (
  <FontAwesomeIcon
    icon={icon}
    style={style}
    className={className}
    onClick={onClick}
  />
));

IconWrapper.displayName = "IconWrapper";
