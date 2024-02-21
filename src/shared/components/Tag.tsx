import styles from './Tag.module.css'

interface TagProps {
  label?: string;
  labelColor?: string;
  startRange: number;
  endRange?: number;
}

export function Tag({label = '', labelColor='', startRange, endRange}: Readonly<TagProps>) {
  const hasEndRange = !!endRange;
  
  return (
    <div className={styles.tagContainer}>
      <span style={{color: labelColor}}>{ label }</span>
      <div className={styles.tag}>
        <span>{ startRange }</span>
        {hasEndRange && <span className={styles.diviser}>de</span>}
        {hasEndRange && <span>{endRange}</span>}
      </div>
    </div>
  )
}