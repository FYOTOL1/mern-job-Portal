import { ReactNode, useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/toolkitHooks'
import { useNavigate } from 'react-router-dom'

const ProtectedUserRoutes = ({ children }: { children: ReactNode }) => {
    const
        { user } = useAppSelector(state => state.auth),
        [canRender, setCanRender] = useState(false),
        navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/")
            setCanRender(false)
        } else {
            setCanRender(true)
        }
    }, [navigate, user])

    return (
        <>
            {canRender && children}
        </>
    )
}

export default ProtectedUserRoutes