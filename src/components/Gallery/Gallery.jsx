import React from "react";
import { nanoid } from "nanoid";
import GalleryItems from "./GalleryItems";
import Button from "./Button";

import styles from "./Gallery.module.css";

export default function Gallery({ items, onOpenModal, onLoadMore }) {
  return (
    <div className={styles.container}>
      <ul className={styles.gallery} onClick={onOpenModal}>
        {items.map(
          ({
            largeImageURL,
            webformatURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) => (
            <GalleryItems
              key={nanoid()}
              large={largeImageURL}
              small={webformatURL}
              tags={tags}
              likes={likes}
              views={views}
              comments={comments}
              downloads={downloads}
            />
          )
        )}
      </ul>
      {items.length >= 15 && <Button action={onLoadMore} />}
    </div>
  );
}
