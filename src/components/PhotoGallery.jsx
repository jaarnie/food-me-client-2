import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core/"

import ImageLightbox from "./ImageLightbox"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 500,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
}))

export default function PhotoGallery({ photos }) {
  const classes = useStyles()

  const handleClick = event => {
    // debugger
    // event.preventDefault()
    console.log("selected pic", event.target.src)
    return <ImageLightbox photos={event.target.src} openModal={true} />
  }

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={200}
        spacing={1}
        className={classes.gridList}
        onClick={handleClick}

      >
        <ImageLightbox photos={photos} />

        {photos.map(p => (
          <GridListTile key={p.photo.id} 
          >
            <img src={p.photo.url} alt={p.photo.caption} />
            <GridListTileBar
              title={p.photo.caption}
              titlePosition="top"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
