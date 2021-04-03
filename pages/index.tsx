import Head from 'next/head'
import { useState } from 'react'
import content from '../public/manuel.json'
import Chapter from '../src/components/Chapter'
import styles from '../styles/Home.module.css'

const chapters = content.chapters
const firstChapter = chapters[0]

export default function Home() {
  const [isChapterByChapterMode, setIsChapterByChapterMode] = useState<boolean>(
    true
  )

  const [currentChapterId, setCurrentChapterId] = useState<string>(
    firstChapter.id
  )

  /**
   * Navigate to next chapter if it exists
   */
  const handleNextChapter = () => {
    const potentialNextChapter: string = (
      Number(currentChapterId) + 1
    ).toString()
    if (chapters.find((chap) => chap.id === potentialNextChapter)) {
      setCurrentChapterId(potentialNextChapter)
    }
  }

  /**
   * Navigate to previous chapter if it exists
   */
  const handlePreviousChapter = () => {
    const potentialPreviousChapter: string = (
      Number(currentChapterId) - 1
    ).toString()
    if (chapters.find((chap) => chap.id === potentialPreviousChapter)) {
      setCurrentChapterId(potentialPreviousChapter)
    }
  }

  /**
   * Display full text
   */
  const buildFullContent = () =>
    content.chapters.map(({ content, id, title }) => (
      <Chapter id={id} key={id + title} paragraphs={content} title={title} />
    ))

  /**
   * Display only chapter one by one
   */
  const buildChapterByChapterContent = () => {
    const chapterToDisplay =
      chapters.find((chap) => chap.id === currentChapterId) ?? firstChapter
    return (
      <Chapter
        id={chapterToDisplay?.id}
        paragraphs={chapterToDisplay?.content}
        title={chapterToDisplay.title}
      />
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Manuel d'Épictète</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1>Manuel d'Épictète</h1>
        <ul>
          <li onClick={() => setIsChapterByChapterMode(true)}>
            Chapitre par chapitre
          </li>
          <li onClick={() => setIsChapterByChapterMode(false)}>
            Texte en une seule page
          </li>
        </ul>
        {isChapterByChapterMode ? (
          <>
            <ul>
              <li onClick={handlePreviousChapter}>Prev</li>
              <li onClick={handleNextChapter}>Next</li>
            </ul>
            {buildChapterByChapterContent()}
          </>
        ) : (
          buildFullContent()
        )}
      </main>
      <footer className={styles.footer}>
        Traduction par{' '}
        <a
          href='https://fr.wikipedia.org/wiki/Jean-Marie_Guyau'
          target='_blank'
          rel='noopener noreferrer'
        >
          Jean-Marie Guyau
        </a>
        , extraite de{' '}
        <a
          href='https://fr.wikisource.org/wiki/Manuel_d%E2%80%99%C3%89pict%C3%A8te_(trad._Guyau)/Manuel'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikisource
        </a>
      </footer>
    </div>
  )
}
