import React from 'react';

import styles from './GalleryItems.module.css';
import { MdThumbUp, MdVisibility, MdComment, MdCloudDownload } from "react-icons/md";

export default function GalleryItems({large, small, tags, likes, views, comments, downloads}) {
  return (
    <li className={styles.item}>
      <div className={styles.photoCard}>
        <div className={styles.photoCardInner}>
          <div className={styles.photoContainer}>
            <a
              href={large}
            >
              <img
                src={small}
                alt={tags}
                data-source={large}
              />
            </a>
            <div className={styles.stats}>
              <div className={styles.statsContainer}>
                <p>
                  <MdThumbUp />
                  {likes}
                </p>
                <p>
                  <MdVisibility />
                  {views}
                </p>
                <p>
                  <MdComment /> 
                  {comments}
                </p>
                <p>
                  < MdCloudDownload />
                  {downloads}
                </p>
              </div>
              <div className={styles.keywordsContainer}>
                <p>
                  {tags}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
