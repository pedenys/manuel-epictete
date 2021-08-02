import Head from 'next/head'
import React, { FormEvent, useRef, useState } from 'react'
import content from '../public/manuel.json'
import Chapter from '../src/components/Chapter'
import Menu from '../src/components/Menu'
import Title from '../src/components/Title'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

const chapters = content.chapters
const firstChapter = chapters[0]
const maxLengthChapters = chapters.length

export default function Home() {
  const router = useRouter()
  const { chapter } = router.query
  const chapterToDisplay =
    chapters.find((chap) => chap.id === chapter) ?? firstChapter
  const chapterNumberInputRef = useRef<HTMLInputElement>(null)

  /**
   * Navigate to next chapter if it exists
   */
  const handleNextChapter = (): void => {
    const potentialNextChapter: string = (Number(chapter) + 1).toString()
    if (chapters.find((chap) => chap.id === potentialNextChapter)) {
      router.push({
        pathname: '',
        query: {
          chapter: potentialNextChapter,
        },
      })
    }
  }

  /**
   * Navigate to previous chapter if it exists
   */
  const handlePreviousChapter = (): void => {
    const potentialPreviousChapter: string = (Number(chapter) - 1).toString()
    if (chapters.find((chap) => chap.id === potentialPreviousChapter)) {
      router.push({
        pathname: '',
        query: {
          chapter: potentialPreviousChapter,
        },
      })
    }
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
      router.push({
        pathname: '',
        query: {
          chapter: roundedChapterNumber.toString(),
        },
      })
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
      <main className={styles.main}>
        <Chapter
          id={chapterToDisplay?.id}
          paragraphs={chapterToDisplay?.content}
          title={chapterToDisplay.title}
        />
      </main>
    </div>
  )
}
