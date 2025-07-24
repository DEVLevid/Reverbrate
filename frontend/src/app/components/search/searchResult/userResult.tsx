import UserInfo from '../../userInfo/userInfo';
import styles from './userResult.module.scss';
import { UserSearchResult } from '@/types/user';

interface UserResultProps {
  users: UserSearchResult[];
}

export default function UserResult({ users }: UserResultProps) {
  if (!users.length) return null;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Usuários</h2>
      <div className={styles.userList}>
        {users.map(user => (
          <UserInfo
            key={user.id}
            id={user.id}
            name={user.name}
            nickname={user.nickname}
            image={user.image}
            bio={''}
          />
        ))}
      </div>
    </div>
  );
} 