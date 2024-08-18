"use client";

import * as React from "react";
import { cn } from "./utils";

const Logo = React.forwardRef<
  React.ElementRef<"p">,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "bg-clip-text text-transparent font-extrabold bg-gradient-to-bl from-gray-900 via-gray-500 to-gray-800",
      className
    )}
    {...props}
  >
    Profile ©
  </span>
));

Logo.displayName = "Logo";

export { Logo };
