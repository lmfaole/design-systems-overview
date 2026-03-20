import styles from "./MotionPreview.module.css";

interface MotionPreviewProps {
  /** CSS variable for animation duration, e.g. "--jkl-motion-timing-energetic" */
  timing: string;
  /** CSS variable for animation easing, e.g. "--jkl-motion-easing-standard" */
  easing: string;
}

export function MotionPreview({ timing, easing }: MotionPreviewProps) {
  return (
    <div className={styles.track} aria-hidden>
      <div
        className={styles.dot}
        style={
          {
            "--preview-timing": `var(${timing})`,
            "--preview-easing": `var(${easing})`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
