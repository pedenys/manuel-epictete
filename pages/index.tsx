import Head from 'next/head'
import { FormEvent, useRef, useState } from 'react'
import content from '../public/manuel.json'
import Chapter from '../src/components/Chapter'
import styles from '../styles/Home.module.css'

const chapters = content.chapters
const firstChapter = chapters[0]
const maxLengthChapters = chapters.length

export default function Home() {
  const [isChapterByChapterMode, setIsChapterByChapterMode] = useState<boolean>(
    true
  )

  const [currentChapterId, setCurrentChapterId] = useState<string>(
    firstChapter.id
  )

  const chapterNumberInputRef = useRef<HTMLInputElement>(null)

  /**
   * Navigate to next chapter if it exists
   */
  const handleNextChapter = (): void => {
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
  const handlePreviousChapter = (): void => {
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
  const buildFullContent = (): Array<JSX.Element> =>
    content.chapters.map(({ content, id, title }) => (
      <Chapter id={id} key={id + title} paragraphs={content} title={title} />
    ))

  /**
   * Display only chapter one by one
   */
  const buildChapterByChapterContent = (): JSX.Element => {
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
  /**
   * Floor chapter number provided by user and if legal (a number && < max chapter number)
   */
  const handleClickOnChapterInputChange = (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    const roundedChapterNumber = Math.round(
      Math.floor(Number(chapterNumberInputRef?.current?.value))
    )
    if (
      typeof roundedChapterNumber === 'number' &&
      roundedChapterNumber <= maxLengthChapters
    ) {
      setCurrentChapterId(roundedChapterNumber.toString())
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Manuel d'Épictète</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
        <h1>Manuel d'Épictète</h1>
        <div className={styles.arrowsAndChapterNumberInput}>
          {/* Chapter number input */}
          <form
            className={styles.inputNumber}
            onSubmit={handleClickOnChapterInputChange}
          >
            <label htmlFor={'chapterNumberInput'}>
              Un n° de chapitre&nbsp;?
            </label>
            <input
              id={'chapterNumberInput'}
              max={maxLengthChapters}
              min={1}
              ref={chapterNumberInputRef}
              type='number'
            />
            <button>Valider</button>
          </form>
          {/* Arrows */}
          <div className={styles.prevAndNextIcons}>
            <button onClick={handlePreviousChapter}>⇽</button>
            <button onClick={handleNextChapter}>⇾</button>
          </div>
        </div>
      </header>
      <main className={styles.main}>{buildChapterByChapterContent()}</main>
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
