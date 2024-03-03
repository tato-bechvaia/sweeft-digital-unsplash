/* eslint-disable react-hooks/exhaustive-deps*/
import { useEffect, useState } from 'react';
import { ImagesService } from './api/ImagesService';
import { ImageComp } from './ImageComp';
import { LoadingSpinner } from './LoadingSpinner';
import './MainPage.css'

export const MainPage = () => {

    const [popularImages, setPopularImages] = useState([]);
    const [queryImages, setQueryImages] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedQueries, setSearchedQueries] = useState([]);

    useEffect(() => {
        const fetchPopularImagesData = async () => {
            try {
                const nextPageData = await ImagesService.fetchPopularImagesByPage(page);
                if(popularImages.length === 0) {
                    setPopularImages(nextPageData);
                } else{
                    setPopularImages(prevState => [...prevState, ...nextPageData]);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchImagesByQuery = async () => {
            try {
                const queryPageData = await ImagesService.fetchImagesByQuery(searchQuery);
                setQueryImages(queryPageData);
            } catch (error) {
                console.log(error);
            }
        }

        if(searchQuery === ''){
            fetchPopularImagesData();
        } else {
            fetchImagesByQuery();
            setPopularImages([]);

            if(!searchedQueries.includes(searchQuery)){
                setSearchedQueries(prevState => [...prevState, searchQuery]);
            }
        }
    }, [page, searchQuery]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >=  documentHeight && searchQuery.trim() === '') {
                setIsLoading(true);
                setTimeout(() => {
                    setPage(prevState => prevState + 1);
                    setIsLoading(false);
                }, 2500);
            }
        };

        if(searchQuery.trim() !== ''){
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return ( 
        <>
            <div className="main-page">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="search-input" 
                    onBlur={(e) => setSearchQuery(e.target.value)}
                />
                <div className="images-container">
                    {searchQuery.trim() === '' ? 
                    (popularImages?.map(imageObject => <ImageComp key={imageObject?.id} imageObj={imageObject}/>)) : 
                    (queryImages.map(imageObj => <ImageComp key={imageObj.id} imageObj={imageObj}/>))}
                </div>
                {isLoading && <LoadingSpinner/>}
            </div>
        </>
    )
}
