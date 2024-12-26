'use client';

import 'react-medium-image-zoom/dist/styles.css';

import Zoom from 'react-medium-image-zoom';

interface ImageZoomProps extends React.ComponentPropsWithoutRef<typeof Zoom> {}

const ImageZoom = ({ children, ...props }: ImageZoomProps) => {
  return (
    <Zoom zoomMargin={40} {...props}>
      {children}
    </Zoom>
  );
};

export default ImageZoom;
