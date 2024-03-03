/* eslint-disable react/prop-types */
import './ImageComp.css';

export const ImageComp = ({imageObj}) => {

    return (
        <>
            <div className="image-container" style={{marginBottom: '20px'}}>
                <img 
                    className='main-image'
                    width='300px' 
                    height='280px' 
                    src={imageObj?.urls?.raw} 
                    alt={imageObj?.alt_description} 
                />
            </div>
        </>
    )
}
