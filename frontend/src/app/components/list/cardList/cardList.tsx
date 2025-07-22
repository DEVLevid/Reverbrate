import React from 'react'
import styles from './styles.module.scss';
import { DotsThreeVertical, MusicNoteSimple, Playlist, PencilSimple, Trash } from '@phosphor-icons/react/ssr';
import { Dropdown, message } from 'antd';
import { useLists } from '@/app/hooks/useLists';

interface CardListProps {
  listName: string;
  userName: string;
  listType: string;
  listId: string;
}

export default function CardList({ listName, userName, listType, listId }: CardListProps) {
  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const { deleteListMutation } = useLists();

  const handleDeleteList = async (listId: string) => {
    deleteListMutation.mutate(listId, {
      onSuccess: () => {
        message.success('Lista deletada com sucesso');
      },
      onError: () => {
        message.error('Erro ao deletar lista');
      },
    });
  };

  const menuItems = [
    {
      key: 'edit',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#010101' }}>
          <PencilSimple size={16} /> Editar
        </span>
      ),
    },
    {
      key: 'delete',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#010101' }} onClick={() => handleDeleteList(listId)}>
          <Trash size={16} /> Excluir
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.nameAndIconContainer}>
        <Playlist size={32} />
        <div className={styles.listContent}>
          <h3>{truncateText(listName)}</h3>
          <p>por {userName}</p>
        </div>
      </div>

      <div className={styles.listAndMenuContainer}>
        <div className={styles.listType}>
          <MusicNoteSimple size={12} />
          <p>{listType}</p>
        </div>
        <div className={styles.menuIcon}>
          <Dropdown 
            menu={{ items: menuItems }} 
            trigger={["click"]} 
            placement="bottomRight" 
            arrow
            popupRender={(menu: React.ReactNode) => (
              <div>{menu}</div>
            )}
            className={styles.dropdown}
          >
            <span style={{ cursor: 'pointer' }}>
              <DotsThreeVertical size={22} />
            </span>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}