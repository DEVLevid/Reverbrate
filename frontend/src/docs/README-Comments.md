# Fluxo de Comments - Documentação

## Configuração da API (infra/api/config.ts)

- Configuração base usando `fetch`
- Tratamento de erros com classe `ApiError`
- URL base configurável via variável de ambiente `NEXT_PUBLIC_API_URL`
- Headers padrão com `Content-Type: application/json`

## Chamadas da API (infra/api/comments.ts)

Funções disponíveis:

```typescript
// Buscar todos os comentários com paginação
getComments(limit = 20, offset = 0): Promise<CommentsResponse>

// Buscar comentário por ID
getCommentById(id: string): Promise<Comment>

// Criar novo comentário
createComment(data: CreateCommentRequest): Promise<Comment>

// Atualizar comentário
updateComment(id: string, data: UpdateCommentRequest): Promise<Comment>

// Deletar comentário
deleteComment(id: string): Promise<void>

// Buscar comentários por track_id
getCommentsByTrackId(trackId: string, limit = 20, offset = 0): Promise<CommentsResponse>
```

## Service Layer (services/commentService.ts)

Camada de serviço com:

- Validações de negócio
- Tratamento de erros específicos
- Mensagens de erro em português
- Validações de rate (1-5) e comentário obrigatório

## Hook useComments (app/hooks/useComments.tsx)

Hook React usando **React Query** com separação entre **Queries** (leitura) e **Mutations** (escrita):

### Queries (Leitura)
- `fetchComments(request)` - Buscar todos os comentários
- `fetchCommentById(id)` - Buscar comentário por ID
- `fetchCommentsByTrackId(request)` - Buscar comentários por música

### Mutations (Escrita)
- `createCommentMutation` - Criar comentário
- `updateCommentMutation` - Atualizar comentário
- `deleteCommentMutation` - Deletar comentário

### Uso do Hook

```typescript
import { useComments } from '../hooks/useComments';

function MyComponent() {
  const {
    fetchComments,
    fetchCommentById,
    fetchCommentsByTrackId,
    createCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
  } = useComments();

  // Usar queries
  const commentsQuery = fetchComments({ limit: 20, offset: 0 });
  const commentQuery = fetchCommentById('comment-id');
  const trackCommentsQuery = fetchCommentsByTrackId({ 
    trackId: 'track-id', 
    limit: 10 
  });

  // Usar mutations
  const handleCreate = async () => {
    await createCommentMutation.mutate({
      track_id: '6DzXaIgVIH7oLA1pkUtFaG',
      rate: 5,
      comment: 'Música incrível!'
    });
  };

  const handleUpdate = async (id: string) => {
    await updateCommentMutation.mutate({
      id,
      data: { rate: 4, comment: 'Comentário atualizado' }
    });
  };

  const handleDelete = async (id: string) => {
    await deleteCommentMutation.mutate(id);
  };

  // Renderizar dados
  if (commentsQuery.isLoading) return <div>Carregando...</div>;
  if (commentsQuery.error) return <div>Erro: {commentsQuery.error.message}</div>;

  return (
    <div>
      {/* Formulário de criação */}
      <form onSubmit={handleCreate}>
        {/* ... campos do formulário ... */}
        <button 
          type="submit" 
          disabled={createCommentMutation.isPending}
        >
          {createCommentMutation.isPending ? 'Criando...' : 'Criar comentário'}
        </button>
        {createCommentMutation.error && (
          <p>Erro: {createCommentMutation.error.message}</p>
        )}
      </form>

      {/* Lista de comentários */}
      {commentsQuery.data?.data.map(comment => (
        <div key={comment.id}>
          <h3>{comment.track_info.name}</h3>
          <p>{comment.review.comment}</p>
          
          <button 
            onClick={() => handleUpdate(comment.id)}
            disabled={updateCommentMutation.isPending}
          >
            {updateCommentMutation.isPending ? 'Atualizando...' : 'Atualizar'}
          </button>
          
          <button 
            onClick={() => handleDelete(comment.id)}
            disabled={deleteCommentMutation.isPending}
          >
            {deleteCommentMutation.isPending ? 'Deletando...' : 'Deletar'}
          </button>
        </div>
      ))}
    </div>
  );
}
```

O React Query está configurado no `layout.tsx` com:

- `staleTime: 60 * 1000` - Dados ficam "frescos" por 1 minuto
- `retry: 1` - Tenta novamente apenas 1 vez em caso de erro
- Cache automático baseado nas query keys

## Configuração do Ambiente

1. Configure a variável de ambiente no `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

2. Certifique-se de que o backend está rodando na porta configurada

## Endpoints Esperados no Backend

O frontend espera os seguintes endpoints no backend:

- `GET /comments?limit=20&offset=0` - Listar comentários
- `GET /comments/:id` - Buscar comentário por ID
- `POST /comments` - Criar comentário
- `PUT /comments/:id` - Atualizar comentário
- `DELETE /comments/:id` - Deletar comentário
- `GET /comments/track/:trackId?limit=20&offset=0` - Comentários por música

## Estrutura de Resposta Esperada

```json
{
  "data": [
    {
      "id": "f86073ff-66df-45de-8f1e-48c4e9352893",
      "track_info": {
        "id": "6DzXaIgVIH7oLA1pkUtFaG",
        "cover": "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400",
        "isrc_id": "GBAHT0500600",
        "name": "The Contract",
        "artist": "Twenty One Pilots"
      },
      "review": {
        "rate": 3,
        "comment": "Som legal"
      }
    }
  ],
  "limit": 20,
  "offset": 0,
  "total": 15
}
```

## Próximos Passos

1. Implementar autenticação no hook (se necessário)
2. Adicionar infinite scroll para paginação
3. Implementar optimistic updates
4. Adicionar testes unitários
5. Melhorar a UI/UX dos componentes 