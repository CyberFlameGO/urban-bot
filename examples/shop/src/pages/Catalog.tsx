import React, { useState } from 'react';
import { Image, ButtonGroup, Button } from '@urban-bot/core';
import { useStore } from '../store/connect';
import { calculateCircularIndex } from '../utils';

export function Catalog() {
    const [productIndex, setProductIndex] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const { products } = useStore();
    const { images } = products[productIndex];

    function previousProduct() {
        setProductIndex(calculateCircularIndex(productIndex - 1, products.length));
        setImageIndex(0);
    }

    function nextProduct() {
        setProductIndex(calculateCircularIndex(productIndex + 1, products.length));
        setImageIndex(0);
    }

    function nextImage() {
        setImageIndex(calculateCircularIndex(imageIndex + 1, images.length));
    }

    return (
        <Image
            isNewMessageEveryRender={false}
            file={products[productIndex].images[imageIndex]}
            buttons={
                <ButtonGroup maxColumns={2}>
                    <Button onClick={previousProduct}>⬅️ prev</Button>
                    <Button onClick={nextProduct}>next ➡️</Button>
                    {images.length > 1 ? <Button onClick={nextImage}>🖼️</Button> : null}
                </ButtonGroup>
            }
        />
    );
}
