import { useRef } from 'react';
import addPhotoIcon from "../../../static/add_photo.svg";
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ImageUploadButton = ({ onImagesSelected, imgClassName }) => {
    const fileInputRef = useRef();

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            onImagesSelected(Array.from(event.target.files));
        }
    };

    return (
        <div>
            <img
                src={addPhotoIcon}
                alt="Upload"
                onClick={handleImageClick}
                className={classNames(imgClassName, 'active:scale-90 transition-transform cursor-pointer')}
            />
            <input
                type="file"
                accept="image/*"
                className='hidden'
                multiple
                onChange={handleImageChange}
                ref={fileInputRef}
            />
        </div>
    );
};


ImageUploadButton.propTypes = {
    onImagesSelected: PropTypes.func.isRequired,
    imgClassName: PropTypes.string,
};

export default ImageUploadButton;