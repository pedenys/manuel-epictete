import React from 'react'

interface Props {
  id: string
  paragraphs: Array<string>
  title: string
}

const Chapter: React.FC<Props> = ({ id, paragraphs, title }) => {
  return (
    <div id={`chapter-${id}`}>
      <h2>
        {id} — {title}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p key={id + index} dangerouslySetInnerHTML={{ __html: paragraph }} />
      ))}
    </div>
  )
}

export default Chapter
