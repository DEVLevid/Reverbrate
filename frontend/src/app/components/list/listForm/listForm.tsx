"use client";

import BaseModal from "@/app/components/base/modal/baseModal";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { useLists } from "@/app/hooks/useLists";
import { ListType } from "@/types/lists";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface AddListProps {
  open: boolean;
  onCancel: () => void;
  initialName?: string;
  initialType?: ListType;
  listId?: string;
  mode?: 'add' | 'edit';
}

export default function listForm({ open, onCancel, initialName = '', initialType = 'track', listId, mode = 'add' }: AddListProps) {
  const [type, setType] = useState<ListType>(initialType);
  const [name, setName] = useState(initialName);
  const { createListMutation, updateListMutation } = useLists();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (open) {
      setName(initialName);
      setType(initialType);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (mode === 'edit' && listId) {
      console.log('Enviando para edição:', { id: listId, data: { name, type } });
      await updateListMutation.mutateAsync(
        { id: listId, data: { name, type } },
        {
          onSuccess: async () => {
            toast.success('Lista editada com sucesso!');
            await queryClient.invalidateQueries({ queryKey: ["lists"] });
            await queryClient.invalidateQueries({ queryKey: ["profile"] });
            setName('');
            onCancel();
          },
          onError: () => {
            toast.error('Erro ao editar lista!');
          },
        }
      );
    } else {
      await createListMutation.mutateAsync(
        {
          name,
          type,
        },
        {
          onSuccess: async () => {
            toast.success('Lista criada com sucesso!');
            await queryClient.invalidateQueries({ queryKey: ["lists"] });
            await queryClient.invalidateQueries({ queryKey: ["profile"] });
            setName('');
            onCancel();
          },
          onError: () => {
            toast.error('Erro ao criar lista!');
          },
        }
      );
    }
  };

  return (
    <BaseModal
      open={open}
      onCancel={onCancel}
      title={mode === 'edit' ? 'Editar lista' : 'Adicionar lista'}
      onOk={handleSubmit}
      okText={mode === 'edit' ? 'Salvar' : 'Adicionar'}
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
            <option value="track" className={styles.formSelectOption}>Músicas</option>
            <option value="album" className={styles.formSelectOption}>Albuns</option>
            <option value="artist" className={styles.formSelectOption}>Artistas</option>
          </select>
        </div>
      </form>
    </BaseModal>
  );
}
