import React from 'react'
import Link from 'next/link'

interface Props {
  title: string
}

const Title: React.FC<Props> = ({ title }) => {
  return (
    <h1>
      <Link href='/'>{title}</Link>
    </h1>
  )
}

export default Title
