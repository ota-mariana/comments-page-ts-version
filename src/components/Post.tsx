import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import style from './Post.module.css'

export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState(['testando comentários']);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const handleNewComment = (event) => {
    event.preventDefault()

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  const handleNewCommentChange = (event) => {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  const deleteComment = (commentToDelete) => {
    const newListWithoutDeletedComment = comments.filter(comment => {
      return comment !== commentToDelete;
    });

    setComments(newListWithoutDeletedComment);
  }

  const handleNewCommentInvalid = (event) => {
    event.target.setCustomValidity('Esse campo está vazio!');
  }

  const isInputCommentEmpty = newCommentText.length === 0;

  return (
    <article className={ style.post }>
      <header>
        <div className={ style.author }>
          <Avatar src={ author.avatarUrl } />

          <div className={ style.authorInfo }>
            <strong>{ author.name }</strong>
            <span>{ author.role }</span>
          </div>  
        </div>

        <time title={ publishedDateFormatted } dateTime={ publishedAt.toISOString() }>
          { publishedDateRelativeToNow }
        </time>
      </header>

      <div className={ style.content }>
        { content.map(line => {
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