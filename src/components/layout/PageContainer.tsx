import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
  id?: string
}

export function PageContainer({
  children,
  className = '',
  as: Tag = 'div',
  id,
}: PageContainerProps) {
  return (
    <Tag id={id} className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  )
}
