import style from './Sidebar.module.css'
import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar'

export function Sidebar() {
  return (
    <aside className={ style.sidebar }>
      <img className={ style.cover } src="https://images.unsplash.com/photo-1676594037928-4ae848ffec58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=40" alt="" />
    
      <div className={ style.profile }>
        <Avatar src="https://github.com/ota-mariana.png" />
        <strong>Mariana Ota</strong>
        <span>Web Developer Front-end</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20}/>
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}
