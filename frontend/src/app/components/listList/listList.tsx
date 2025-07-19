import { ListsResponse } from '@/types/lists';
import { Pagination } from 'antd';
import { useState } from 'react';
import CardList from '../list/cardList/cardList';
import styles from "./styles.module.scss";

interface ListListProps {
    title: string;
    lists: ListsResponse;
}

export default function ListList({ title, lists }: ListListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentLists = lists.data.slice(startIndex, endIndex);

    return (
        <div className={styles.container}>
            <h3>{title}</h3>
            <div className={styles.wrapper}>
                {currentLists.length <= 0 ?
                    <i className={styles.noLists}>Você ainda não possui listas...</i>
                    :
                    currentLists.map(list => {
                        
                        return <CardList key={list.id} listName={list.name} listType={list.type} userName={"TzuChaeDahy"} />
                    })
                }
            </div>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={lists.total} // Avaliar uso
                onChange={handlePageChange}
                className={styles.listPagination}
            />
        </div>
    );
}