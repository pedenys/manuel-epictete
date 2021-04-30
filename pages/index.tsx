import Head from 'next/head'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import content from '../public/manuel.json'
import Chapter from '../src/components/Chapter'
import Menu from '../src/components/Menu'
import Title from '../src/components/Title'
import styles from '../styles/Home.module.css'

const chapters = content.chapters
const firstChapter = chapters[0]
const maxLengthChapters = chapters.length

export default function Home() {
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
        <Title title={"Manuel d'Épictète"} />
        <div className={styles.arrowsAndChapterNumberInput}>
          {/* Chapter number input */}
          <Menu
            handleNextChapter={handleNextChapter}
            handlePreviousChapter={handlePreviousChapter}
            handleClickOnChapterInputChange={handleClickOnChapterInputChange}
            maxLengthChapters={maxLengthChapters}
            chapterNumberInputRef={chapterNumberInputRef}
          />
        </div>
      </header>
      <main className={styles.main}>{buildChapterByChapterContent()}</main>
    </div>
  )
}
