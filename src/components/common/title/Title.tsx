import type { FC } from "react";

interface TitleProps {
  tag: "h1" | "h2" | "h3";
  text: string
}

export const Title: FC<TitleProps> = ({ tag, text }) => {
  const Tag = tag;

  return <Tag>{text}</Tag>;
};

Title.displayName = "Title";
