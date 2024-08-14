import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  return (
    <button
      className="ui-p-2 ui-rounded-md hover:ui-bg-slate-200 ui-font-semibold ui-uppercase"
      {...props}
    />
  );
}
