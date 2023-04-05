// import { Component } from 'react';
import { Galleryitem, Galleryimage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ url, tags, id, getModalImg, openModal }) => {
  const handleClick = e => {
    getModalImg(e.target.id);
    openModal();
  };
  return (
    <Galleryitem>
      <Galleryimage id={id} src={url} alt={tags} onClick={handleClick} />
    </Galleryitem>
  );
};

// export class OldImageGalleryItem extends Component {
//   handleClick = e => {
//     this.props.getModalImg(e.target.id);
//     this.props.openModal();
//   };

//   render() {
//     const { url, tags, id } = this.props;
//     return (
//       <Galleryitem>
//         <Galleryimage id={id} src={url} alt={tags} onClick={this.handleClick} />
//       </Galleryitem>
//     );
//   }
// }

ImageGalleryItem.protoType = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  getModalImg: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
