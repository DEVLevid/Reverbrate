import { List, ListType } from "@/types/lists";
import BaseModal from "../../base/modal/baseModal";
import { Input } from "antd";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { useLists } from "@/app/hooks/useLists";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface ListModalProps {
  open: boolean;
  onCancel: () => void;
  initialValues?: List;
}

export default function ListModal({
  open,
  initialValues,
  onCancel,
}: ListModalProps) {
  const [listType, setListType] = useState<ListType>(
    initialValues?.type || "track"
  );
  const [listName, setListName] = useState<string>(initialValues?.name || "");

  const { createListMutation, updateListMutation } = useLists();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialValues) {
      setListName(initialValues.name);
    } else {
      setListType("track");
      setListName("");
    }
  }, [initialValues]);

  const handleSubmit = async () => {
    if (initialValues) {
      await updateListMutation.mutateAsync(
        {
          id: initialValues.id,
          data: {
            name: listName,
          },
        },
        {
          onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["lists"] });
            await queryClient.invalidateQueries({ queryKey: ["profile"] });
            onCancel();
          },
          onError: (error) => {
            toast.error("Houve um erro ao atualizar a lista");
          },
        }
      );
    } else {
      await createListMutation.mutateAsync(
        {
          name: listName,
          type: listType,
        },
        {
          onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["lists"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            onCancel();
            toast.success("Lista criada com sucesso");
          },
          onError: () => {
            toast.error("Houve um erro ao atualizar a lista");
          },
        }
      );
    }
  };

  return (
    <BaseModal
      open={open}
      onCancel={onCancel}
      title={initialValues ? "Editar lista" : "Adicionar lista"}
      okText={initialValues ? "Salvar" : "Adicionar"}
      cancelText="Cancelar"
      onOk={handleSubmit}
    >
      <div className={styles.form}>
        <div className={styles.info}>
          <h3>Nome da lista</h3>
        </div>
        <Input
          placeholder="Nome da lista"
          className={styles.formInput}
          value={listName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setListName(e.target.value)
          }
          required
        />
        <div className={styles.info}>
          <h3>Tipo de lista</h3>
        </div>
        <select
          className={styles.formSelect}
          value={listType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setListType(e.target.value as ListType);
          }}
          disabled={!!initialValues}
        >
          <option value="track">Música</option>
          <option value="album">Album</option>
          <option value="artist">Artista</option>
        </select>
      </div>
    </BaseModal>
  );
}
