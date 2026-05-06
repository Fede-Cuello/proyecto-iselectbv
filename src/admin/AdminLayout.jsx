import { useEffect, useState } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router'
import { supabase } from '../firebase/supabase'
import styles from './admin.module.css'

export default function AdminLayout() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
      if (!session) navigate('/admin/login')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session) navigate('/admin/login')
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (loading) return <div className={styles.loadingScreen}>Cargando...</div>
  if (!user) return null

  return (
    <div className={styles.adminWrapper}>
      <nav className={styles.adminNav}>
        <span className={styles.adminBrand}>ISelectBV <span className={styles.adminBadge}>Admin</span></span>
        <div className={styles.navLinks}>
          <NavLink
            to="/admin/productos"
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
          >
            Productos
          </NavLink>
          <NavLink
            to="/admin/productos/nuevo"
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
          >
            + Nuevo
          </NavLink>
        </div>
        <div className={styles.navRight}>
          <span className={styles.userEmail}>{user.email}</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>Salir</button>
        </div>
      </nav>
      <main className={styles.adminMain}>
        <Outlet />
      </main>
    </div>
  )
}
