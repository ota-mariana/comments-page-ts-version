import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import style from './Post.module.css'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(['testando comentários']);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const handleNewComment = (event: FormEvent) => {
    event.preventDefault()

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  const deleteComment = (commentToDelete: string) => {
    const newListWithoutDeletedComment = comments.filter(comment => {
      return comment !== commentToDelete;
    });

    setComments(newListWithoutDeletedComment);
  }

  const handleNewCommentInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('Esse campo está vazio!');
  }

  const isInputCommentEmpty = newCommentText.length === 0;

  return (
    <article className={ style.post }>
      <header>
        <div className={ style.author }>
          <Avatar src={ post.author.avatarUrl } />

          <div className={ style.authorInfo }>
            <strong>{ post.author.name }</strong>
            <span>{ post.author.role }</span>
          </div>  
        </div>

        <time title={ publishedDateFormatted } dateTime={ post.publishedAt.toISOString() }>
          { publishedDateRelativeToNow }
        </time>
      </header>

      <div className={ style.content }>
        { post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={ line.content }>{ line.content }</p>
          } else if (line.type === 'link') {
            return <p key={ line.content }><a href="#">{ line.content }</a></p>
          }
        })}
      </div>

      <form onSubmit={handleNewComment} className={ style.commentForm }>
        <strong>Deixe seu comentário</strong>

        <textarea
          placeholder="Digite um comentário aqui..."
          value={ newCommentText }
          onChange={ handleNewCommentChange }
          onInvalid={ handleNewCommentInvalid }
          required
        />

        <button type="submit" disabled={ isInputCommentEmpty }>Comentar</button>
      </form>

      <div className={ style.commentList }>
        {comments.map(comment => {
          return (
            <Comment
              key={ comment }
              content={ comment }
              onDeleteComment={ deleteComment }
            />
          )
        })}
      </div>
    </article>
  )
}