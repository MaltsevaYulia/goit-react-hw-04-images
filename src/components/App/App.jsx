import {  useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { AppDiv } from './App.styled';
import fetchPhotos from '../../api/api';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [largeUrl, setLargeUrl] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    const search = async () => {
      setIsLoading(true);
      try {
        const newPhotos = await fetchPhotos(query, page);
        setPhotos(prevPhotos => {
          return [...prevPhotos, ...newPhotos.hits]
        });

        setIsLoadMore(true);
      } catch (error) {
        console.log(error);
        setIsLoadMore(false);
        alert('Sorry, there are no images. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    search();
  }, [page, query]);

  const getQuery = q => {
    // if (this.state.query !== query) {
    setQuery(q);
    setPage(1);
    setPhotos([]);
    // }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = () => {
    setIsModalShow(prevState => !prevState);
  };
  const getModalImg = imgId => {
    const larImgUrlEl = photos.find(el => el.id === Number(imgId));
    const largeUrl = larImgUrlEl.largeImageURL;
    setLargeUrl(largeUrl);
  };

  return (
    <AppDiv>
      <Searchbar onSubmit={getQuery} />
      {photos && (
        <ImageGallery
          photos={photos}
          getModalImg={getModalImg}
          openModal={toggleModal}
        />
      )}
      {isLoading && <Loader />}
      {photos && isLoadMore && !isLoading && <Button loadMore={loadMore} />}
      {isModalShow && <Modal onClose={toggleModal} url={largeUrl} />}
    </AppDiv>
  );
};



///////////////////////////////////

// export class OldApp extends Component {
//   state = {
//     photos: null,
//     query: '',
//     page: 1,
//     isLoading: false,
//     isLoadMore: false,
//     isModalShow: false,
//     largeUrl: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     // Если изменилось query, ищем фото
//     const prevQuery = prevState.query;
//     const prevPage = prevState.page;
//     const { query, page } = this.state;
//     if (prevQuery !== query) {
//       this.setState({ photos: null });

//       this.search(query);
//     } else if (prevPage !== page) this.search(query);
//   }

//   search = async query => {
//     this.setState({ isLoading: true });
//     try {
//       const photos = await fetchPhotos(query, this.state.page);
//       if (!this.state.photos) {
//         this.setState({ photos: photos.hits });
//       } else {
//         this.setState(prevState => {
//           const prevPhotos = prevState.photos;
//           return { photos: [...prevPhotos, ...photos.hits] };
//         });
//       }

//       this.setState({ isLoadMore: true });
//     } catch (error) {
//       console.log(error);
//       this.setState({ isLoadMore: false });
//       alert('Sorry, there are no images. Please try again.');
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   getQuery = query => {
//     if (this.state.query !== query) {
//       this.setState({ page: 1 });
//       this.setState({ query });
//     }
//   };

//   loadMore = () => {
//     this.setState(prevState => {
//       const prevPage = prevState.page;
//       return { page: prevPage + 1 };
//     });
//   };

//   toggleModal = () => {
//     this.setState(prevState => {
//       return { isModalShow: !prevState.isModalShow };
//     });
//   };

//   getModalImg = imgId => {
//     const larImgUrlEl = this.state.photos.find(el => el.id === Number(imgId));
//     const largeUrl = larImgUrlEl.largeImageURL;
//     this.setState({ largeUrl });
//   };

//   render() {
//     const { photos, isLoading, isModalShow, largeUrl, isLoadMore } = this.state;
//     return (
//       <AppDiv>
//         <Searchbar onSubmit={this.getQuery} />
//         {photos && (
//           <ImageGallery
//             photos={photos}
//             getModalImg={this.getModalImg}
//             openModal={this.toggleModal}
//           />
//         )}
//         {isLoading && <Loader />}
//         {photos && isLoadMore && !isLoading && (
//           <Button loadMore={this.loadMore} />
//         )}
//         {isModalShow && <Modal onClose={this.toggleModal} url={largeUrl} />}
//       </AppDiv>
//     );
//   }
// }
