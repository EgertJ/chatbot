import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Message = {
  text: string;
  sender: "bot" | "user";
  timestamp: Date | undefined;
};
