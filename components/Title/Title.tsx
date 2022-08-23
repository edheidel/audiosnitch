import React from "react";

const Title = ({ tag, text }: { tag: "h1" | "h2" | "h3"; text: string }) => {
  const Tag = tag;
  return <Tag>{text}</Tag>;
};

export default Title;
