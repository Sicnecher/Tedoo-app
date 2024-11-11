import axios from "axios";
import { useEffect, useState } from "react";
import BarComponent from './components/upperBar/component'
import PostComponent from './components/post/component'
import style from './style.module.css'
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

export default function App() {
  const { ref, inView } = useInView();
  const { data, error, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await axios.get(`https://backend.tedooo.com/hw/feed.json?skip=${pageParam}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, _, lastPageParam: any) => {
      console.log(lastPageParam)
      return (
        lastPage && lastPage.length > 0 ? lastPageParam + 6 : undefined
      )
    }
  });

  useEffect(() => {
    console.log(inView)
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
              {data.pages.map((paginationData: any) => paginationData.map((singlePostData: any) => <PostComponent postData={singlePostData}/>))}
              <div ref={ref}></div>
              <br />
            </div>
        }
    </div>
  );
}