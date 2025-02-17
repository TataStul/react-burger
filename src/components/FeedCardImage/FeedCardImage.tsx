import styles from "./FeedCardImage.module.css";

type FeedCardImageProps = {
  index: number;
  image?: string;
};

export function FeedCardImage({ image, index }: FeedCardImageProps) {
  return (
    <img
      src={image}
      alt=""
      className={styles.image}
      style={{
        right: index * 15,
        position: "relative",
        zIndex: 800 - index,
      }}
    />
  );
}
