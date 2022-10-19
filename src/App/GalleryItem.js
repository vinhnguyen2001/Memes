
import React from 'react';

const GalleryItem = (prop) => {


    return (
        <div className="gallery-item">
            <img src={prop.memeURL} alt={prop.alt} />
        </div>
    )
}

export default GalleryItem;