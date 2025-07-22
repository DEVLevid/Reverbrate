"use client";

import BaseModal from "@/app/components/base/modal/baseModal";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useLists } from "@/app/hooks/useLists";
import { ListType } from "@/types/lists";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface AddListProps {
  open: boolean;
  onCancel: () => void;
}

export default function AddList({ open, onCancel }: AddListProps) {
  const [type, setType] = useState<ListType>("track");
  const [name, setName] = useState("");
  const { createListMutation } = useLists();
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    await createListMutation.mutateAsync(
      {
        name,
        type,
      },
      {
        onSuccess: async () => {
          toast.success("Lista criada com sucesso!");
          await queryClient.invalidateQueries({ queryKey: ["lists"] });
          await queryClient.invalidateQueries({ queryKey: ["profile"] });
          setName("");
          onCancel();
        },
        onError: () => {
          toast.error("Erro ao criar lista!");
        },
      }
    );
  };

  return (
    <BaseModal
      open={open}
      onCancel={onCancel}
      title="Adicionar lista"
      onOk={handleSubmit}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label className={styles.formItemLabel}>Nome da lista</label>
          <input
            placeholder="Nome da lista"
            className={styles.formItemInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formItem}>
          <label className={styles.formItemLabel}>Tipo de lista</label>
          <select
            className={styles.formSelect}
            value={type}
            onChange={(e) => setType(e.target.value as ListType)}
          >
            <option value="track" className={styles.formSelectOption} selected>
              Músicas
            </option>
            <option value="album" className={styles.formSelectOption}>
              Albuns
            </option>
            <option value="artist" className={styles.formSelectOption}>
              Artistas
            </option>
          </select>
        </div>
      </form>
    </BaseModal>
  );
}
