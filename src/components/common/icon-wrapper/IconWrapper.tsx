import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { type FC, memo } from "react";

export const IconWrapper: FC<FontAwesomeIconProps> = memo(({
  icon,
  style,
  className,
  onClick,
}) => (
  <div className={className}>
    <FontAwesomeIcon
      icon={icon}
      style={style}
      onClick={onClick}
    />
  </div>
));

IconWrapper.displayName = "IconWrapper";
