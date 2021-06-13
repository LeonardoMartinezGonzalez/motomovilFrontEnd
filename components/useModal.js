import { useState } from 'react';

export const useModal = (initialIsOpened = false) => {
    const [isOpened, setIsOpened] = useState(initialIsOpened);

    const toggle = () => setIsOpened( !isOpened );

    //alert('estado de la ventana:' + isOpened);

    return [isOpened, setIsOpened, toggle];
};
