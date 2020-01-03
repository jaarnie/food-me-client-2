import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';


export default function ImageLightbox({ photos, openModal }) {
	const [state, setState] = useState({
        photoIndex: 0,
        isOpen: false,
    })

    const images = photos.map(p => p.photo)

    const { isOpen, photoIndex } = state
    // debugger
    return (
      <div>
        <button type="button" onClick={() => setState({ isOpen: true })}>
          Open Lightbox
        </button>

        {isOpen && (
          <Lightbox
            mainSrc={images[3].url}
            imageTitle={images[3].caption}
            // nextSrc={images[(photoIndex + 1) % images.length]}
            // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setState({ isOpen: false })}
            // onMovePrevRequest={() =>
            //   setState({
            //     photoIndex: (photoIndex + images.length - 1) % images.length,
            //   })
            // }
            // onMoveNextRequest={() =>
            //   setState({ photoIndex: (photoIndex + 1) % images.length })
            // }
          />
        )}
      </div>
    );
}
