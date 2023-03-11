import './global.css'

import style from './App.module.css'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { PostType, Post } from './components/Post'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/ota-mariana.png',
      name: 'Mariana Ota',
      role: 'Web Developer Front-end',
    },
    content: [
      { type: 'paragraph', content: 'Hellooo people!' },
      { type: 'paragraph', content: 'Acabei de finalizar mais um projeto do Ignite.' },
      { type: 'link', content: 'Link do repositório' },
    ],
    publishedAt: new Date('2023-03-09 13:21:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @Rocketseat',
    },
    content: [
      { type: 'paragraph', content: 'Hellooo people!' },
      { type: 'paragraph', content: 'Acabei de finalizar mais um projeto do Ignite.' },
      { type: 'link', content: 'Link do repositório' },
    ],
    publishedAt: new Date('2023-03-10 22:45:00'),
  },
];

function App() {
  return (
    <div>
      <Header />
      
      <div className={ style.wrapper }>
        <Sidebar />
        
        <main>
          { posts.map(post => {
            return (
              <Post
                key={ post.id }
                post={ post }
              />
            )
          }) }
        </main>
      </div>
    </div>
  )
}

export default App
