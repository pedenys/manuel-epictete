import React, { FormEvent, useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'

interface Props {
  handleNextChapter: () => void
  handlePreviousChapter: () => void
  handleClickOnChapterInputChange: (event: FormEvent<HTMLFormElement>) => void
  maxLengthChapters: number
  chapterNumberInputRef: React.RefObject<HTMLInputElement>
}

const Menu: React.FC<Props> = ({
  handleClickOnChapterInputChange,
  handleNextChapter,
  handlePreviousChapter,
  maxLengthChapters,
  chapterNumberInputRef,
}) => {
  const [displayFloatingMenu, setDisplayFloatingMenu] = useState<boolean>(false)
  let chapterTitleHeight: number | undefined

  useEffect(() => {
    chapterTitleHeight =
      document &&
      document.querySelector("div[id^='chapter-'] h2")?.getBoundingClientRect()
        .y

    window.addEventListener('scroll', handleFloatingMenuDisplayBasedOnScroll)
    return () =>
      window.removeEventListener(
        'scroll',
        handleFloatingMenuDisplayBasedOnScroll
      )
  }, [])

  const handleFloatingMenuDisplayBasedOnScroll = () => {
    if (chapterTitleHeight) {
      if (window.scrollY > chapterTitleHeight && !displayFloatingMenu) {
        setDisplayFloatingMenu(true)
      } else {
        setDisplayFloatingMenu(false)
      }
    }
  }

  return (
    <>
      <form
        className={styles.inputNumber}
        onSubmit={handleClickOnChapterInputChange}
      >
        <label htmlFor={'chapterNumberInput'}>Un n° de chapitre&nbsp;?</label>
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
      <div
        className={
          displayFloatingMenu
            ? styles.floatingPrevAndNextIcons
            : styles.prevAndNextIcons
        }
      >
        <button onClick={handlePreviousChapter}>⇽</button>
        <button onClick={handleNextChapter}>⇾</button>
      </div>
    </>
  )
}

export default Menu
