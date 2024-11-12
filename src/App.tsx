import axios from "axios";
import { useEffect, useState } from "react";
import BarComponent from './components/upperBar/component'
import PostComponent from './components/post/component'
import style from './style.module.css'
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ClipLoader from 'react-spinners/ClipLoader';
import { PostModel } from "./models/post";


export default function App() {
  const { ref, inView } = useInView();

  //this is a library for managing pagination and infinite scrolling
  const { data, error, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) => {
      try{
        const response = await axios.get(`https://backend.tedooo.com/hw/feed.json?skip=${pageParam}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        return response.data;
      }catch(err){
        return err;
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: {hasMore: boolean, data: PostModel[]}, _, lastPageParam: number) => (
      //checking the last page's boolean value of the hasMore property to understand wether there is more data to fetch 
      lastPage.hasMore && lastPage.data.length > 0 ? lastPageParam + 6 : undefined
    )
  });

  useEffect(() => {
    if(inView && hasNextPage){
      fetchNextPage();
    }
 }, [inView])

  return (
    <div>
      <BarComponent />
        {
        status === 'pending' ? <div>Loading...</div> :
          status === 'error' ? <div>{error.message}</div> :
            <div className={style.postsContainer}>
              <br />
              {/* two iterations are required because on every new load the data is pushed to an array of fetched data, maping each element of the array and then maping the element itself which is an array with length of 6 */}
              {data.pages.map((paginationData: {hasMore: boolean, data: PostModel[]}) => {
                return paginationData.data.map((singlePostData: PostModel) => (
                  <PostComponent postData={singlePostData} />
                ))
              })}
              <div ref={ref}><ClipLoader color="#3498db" loading={isFetchingNextPage} size={50} /></div>
              <br />
            </div>
        }
    </div>
  );
}