export interface IconData {
  name: string;
  category: string;
  keywords: string[];
  svgContent: string;
}

export interface IconComponentProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}
