'use client'

import { SessionProvider } from "next-auth/react"


interface ProviderProp{
    children:React.ReactNode
}

export function Provider({children}:ProviderProp){
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
