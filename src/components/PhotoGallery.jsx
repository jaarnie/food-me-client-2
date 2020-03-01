import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core/'
import Carousel, { Modal, ModalGateway } from 'react-images'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 500,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}))

const PhotoGallery = ({ photos }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    selectedIndex: 0,
    lightboxIsOpen: false,
    isLoading: false,
    imageUrls: [],
  })
  const { selectedIndex, lightboxIsOpen, isLoading } = state

  const toggleLightbox = (selectedIndex) => {
    setState({
      lightboxIsOpen: !lightboxIsOpen,
      selectedIndex,
    })
  }

  const galleryModal = () => {
    const imageUrls = []
    photos.map((p) => imageUrls.push({ src: p.photo.url }))

    return (
      <Modal onClose={toggleLightbox}>
        <Carousel
          currentIndex={selectedIndex}
          closeOnBackdropClickBoolean
          frameProps={{ autoSize: 'height' }}
          views={imageUrls}
        />
      </Modal>
    )
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {photos.map(({ photo }, j) => (
          <GridListTile key={photo.id} onClick={() => toggleLightbox(j)}>
            <img src={photo.url} alt={photo.caption} />
            <GridListTileBar
              title={photo.caption}
              titlePosition="top"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>

      <ModalGateway>{lightboxIsOpen && !isLoading ? galleryModal() : null}</ModalGateway>
    </div>
  )
}

PhotoGallery.defaultProps = {
  photos: [],
}

PhotoGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object),
}

export default React.memo(PhotoGallery)
