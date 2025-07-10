import { Carousel } from "antd";
import styles from "./styles.module.scss";
import { ListsResponse } from "@/types/lists";

interface ListsCarouselProps {
  lists: ListsResponse;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function ListsCarousel({ lists }: ListsCarouselProps) {
  const groupedLists = chunkArray(lists.data, 8);

  return (
    <div className={styles.carouselContainer}>
      <h2>Listas</h2>
      {lists.data.length > 0 ? (
        <Carousel fade arrows draggable className={styles.carousel}>
          {groupedLists.map((group, index) => (
            <div key={index} className={styles.reviewGroup}>
              {group.map((list, i) => (
                // <ListCarouselItem key={list?.id || i} data={list} />
                <div key={list?.id || i}>{list?.name}</div>
              ))}
            </div>
          ))}
        </Carousel>
      ) : (
        <div className={styles.noLists}>
          <p>Nenhuma lista encontrada</p>
        </div>
      )}
    </div>
  );
}
