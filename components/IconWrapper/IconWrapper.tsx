import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

const IconWrapper = ({ icon, style, className, onClick }: FontAwesomeIconProps) => (
  <FontAwesomeIcon icon={icon} style={style} className={className} onClick={onClick} />
);

export default React.memo(IconWrapper);
