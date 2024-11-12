import { useInView } from 'react-intersection-observer'
import style from './style.module.css'
import getTime from './timeCalc'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { PostModel } from '../../models/post'

export default function Component({postData} : {postData: PostModel}){
    const [isLiked, setIsLiked] = useState<boolean | null>(null)
    const likeButtonRef = useRef<HTMLSpanElement | null>(null)
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    useEffect(() => {
        if(inView){
            const sendExpression = async () => {
                await axios.get(`https://backend.tedooo.com/?itemId=${postData.id}`)
            }
            sendExpression()
        }
    }, [inView])

    const handleLike = (element: React.RefObject<HTMLSpanElement>) => {
        if(element.current){
            element.current.style.color = isLiked ? 'black' : 'blue'
            setIsLiked(!isLiked)
        }
    }

    const timeSincePosting = getTime(postData.date);

    return(
        <div ref={ref} data-user-id={postData.userId} data-shop-id={postData.shopId} className={style.post}>
             <section className={style.infoSection}>
                <div>
                    <img className={style.profileWrapper} src={postData.avatar} alt="image" width={50} height={50} />
                    <p><span>{postData.username}</span><br /><span style={{color: 'blue'}}>{postData.shopName}</span>{' • '}
                        {[
                            timeSincePosting.years && `${timeSincePosting.years}y`,
                            timeSincePosting.months && `${timeSincePosting.months}m`,
                            !timeSincePosting.years && timeSincePosting.days && `${timeSincePosting.days}d`,
                            !timeSincePosting.months && timeSincePosting.hours && `${timeSincePosting.hours}h`
                        ].filter(Boolean).join(' ')}
                    </p>
                </div>
                    <h4>{postData.text}</h4>
            </section>
            <div className={style.imageContainer}>
                <div className={style.sliderWrapper}>
                    <div className={style.slider}>
                        {postData.images.map((imageUrl: string, index: number) => {
                            return (
                                <>
                                    <div id={`slide-${postData.id}-${index}`} key={index} style={{backgroundImage: `url(${imageUrl})`}} className={style.blurBackground}>
                                    <img src={imageUrl} alt="some image" />
                                </div>
                            </>
                        )
                        })}
                    </div>
                        {postData.images.length > 1 && (
                            <div className={style.sliderNav}>
                                {postData.images.map((_: string, index: number, array: Array<string>) => {
                                    return (
                                        <a href={`#slide-${postData.id}-${index}`}></a>
                                    )
                                })}
                            </div>
                        )}
                </div>
            </div>
            <section className={style.reactionSection}>
                <div>
                    <span>
                        <i className="bi bi-hand-thumbs-up-fill" />{` ${isLiked ? postData.likes + 1 : postData.likes}`}
                    </span>
                    <span>
                        {`${postData.comments} comments`}
                    </span>
                </div>
                <hr />
                <div className={style.lowestBar}>
                    <span ref={likeButtonRef} onClick={() => handleLike(likeButtonRef)}><i className="bi bi-hand-thumbs-up"></i> Likes</span>
                    <span><i className="bi bi-chat-left"></i> Comments</span>
                </div>
            </section>
        </div>
    )
}
