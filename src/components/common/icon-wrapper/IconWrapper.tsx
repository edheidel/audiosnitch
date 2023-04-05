import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { type FC, memo } from "react";

export const Icon: FC<FontAwesomeIconProps> = memo(({
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

Icon.displayName = "Icon";
