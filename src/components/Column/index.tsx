import type { HTMLAttributes, PropsWithChildren } from "react";

import styles from "./index.module.css";

export const Column = ({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div
    {...props}
    className={`${styles.column} ${props.className && props.className}`}
  >
    {children}
  </div>
);
