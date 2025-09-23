import React from "react";
import type { IconComponentProps } from "./types";

export function createIcon(name: string, svgContent: string) {
  const IconComponent: React.FC<IconComponentProps> = ({
    size = 24,
    className,
    style,
    onClick,
    "aria-label": ariaLabel,
    title,
    ...rest
  }) => {
    const label = ariaLabel || name;
    return (
      <span
        role="img"
        aria-label={label}
        title={title || label}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (onClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick(e as unknown as React.MouseEvent<HTMLSpanElement, MouseEvent>);
          }
        }}
        className={className}
        style={{
          display: "inline-block",
          width: size,
          height: size,
          lineHeight: 0,
          cursor: onClick ? "pointer" : undefined,
          ...style,
        }}
        {...rest}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: normalizeSvg(svgContent),
        }}
      />
    );
  };

  IconComponent.displayName = name;
  return IconComponent;
}1

function normalizeSvg(svg: string) {
  // Ensure the root <svg> fills the wrapper size
  let out = svg.trim();
  if (!out.startsWith("<svg")) return out;
  // Force width/height to 100%
  out = out
    .replace(/width=\".*?\"/g, 'width="100%"')
    .replace(/height=\".*?\"/g, 'height="100%"');
  // Ensure xmlns present
  if (!/xmlns=\"http:\/\/www.w3.org\/2000\/svg\"/.test(out)) {
    out = out.replace(
      /<svg(.*?>)/,
      '<svg xmlns="http://www.w3.org/2000/svg" $1',
    );
  }
  return out;
}
