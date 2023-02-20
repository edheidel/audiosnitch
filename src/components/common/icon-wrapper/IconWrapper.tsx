import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { memo } from "react";

export const IconWrapper = memo(({
  icon,
  style,
  className,
  onClick,
}: FontAwesomeIconProps) => (
  <FontAwesomeIcon
    icon={icon}
    style={style}
    className={className}
    onClick={onClick}
  />
));

IconWrapper.displayName = "IconWrapper";
