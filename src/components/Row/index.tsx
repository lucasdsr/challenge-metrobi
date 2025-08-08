import type { HTMLAttributes, PropsWithChildren } from "react";

import styles from "./index.module.css";

export const Row = ({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div
    {...props}
    className={`${styles.row} ${props.className && props.className}`}
  >
    {children}
  </div>
);
