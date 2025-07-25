import { Modal, List, Spin, message } from 'antd';
import { useLists } from '@/app/hooks/useLists';
import styles from './styles.module.scss';
import { Playlist } from '@phosphor-icons/react/dist/ssr';

interface AddListModalProps {
  open: boolean;
  onClose: () => void;
  itemId: string | null;
  title?: string;
}

export default function AddListModal({ open, onClose, itemId, title = 'Adicionar à lista' }: AddListModalProps) {
  const { fetchLists, editListItemsMutation } = useLists();
  const { data, isLoading } = fetchLists();

  const handleAddToList = (listId: string) => {
    if (!itemId) return;
    editListItemsMutation.mutate(
      { id: listId, data: { operation: 'add', item_id: itemId } },
      {
        onSuccess: () => {
          message.success('Música adicionada à lista!');
          onClose();
        },
        onError: () => {
          message.error('Erro ao adicionar música à lista');
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={title}
      footer={null}
      className={styles.customModal}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <List
          dataSource={data?.data || []}
          renderItem={list => (
            <List.Item
              key={list.id}
              onClick={() => handleAddToList(list.id)}
              className={styles.listItem}
            >
              <Playlist size={24} />{list.name}
            </List.Item>
          )}
          className={styles.listModal}
        />
      )}
    </Modal>
  );
}
