/* eslint-disable react/prop-types */
import './ImageModal.css';

export const ImageModal = ({imageObject}) => {
    return (
        <>
            <div className="image-modal">
                <div className="image-modal-src">
                    <img src={imageObject?.urls?.regular} alt="" />
                </div>
                <div className="image-modal-info">
                    <div className="image-modal-likes">
                        {imageObject?.likes}
                    </div>
                    <div className="image-modal-views">
                        {}
                    </div>
                    <div className="image-modal-downloads">
                        {}
                    </div>
                </div>
            </div>
        </>
    )
}
