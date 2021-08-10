import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className={'f3'}>
                {'This Magic Brain will detect faces in your photos!'}
            </p>
            <div className={'form center'}>
                <input type={'text'} className={'f4 pa2 w-70 center'} 
                placeholder={'type your url'}
                onChange={onInputChange} />
                <button className={'w-30 grow link ph3 pv2 dib white bg-light-purple'} 
                onClick={onButtonSubmit}>
                    Detect
                </button>
            </div>
        </div>
    )
};

export default ImageLinkForm;