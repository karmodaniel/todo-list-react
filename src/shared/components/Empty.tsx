import { ClipboardText } from "@phosphor-icons/react";
import styles from "./Empty.module.css";

export function Empty() {
  return (
    <div className={styles.wrapper}>
      <ClipboardText className={styles.icon} size={56} />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
}
