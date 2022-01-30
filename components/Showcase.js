import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Image from "next/image";

export default function Showcase({ entries }) {
  return (
    <ImageList className="image-list">
      {entries.map((entry) => (
        <ImageListItem key={entry.id}>
          <a href={entry.url.value} target="_blank" rel="noreferrer">
            <Image
              src={entry.image.url}
              alt={entry.image.title}
              height={entry.image.height}
              width={entry.image.width}
            />
          </a>
          <ImageListItemBar title={entry.image.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
