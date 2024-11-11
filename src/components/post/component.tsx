import style from './style.module.css'
import { useEffect, useRef, useState } from 'react'

export default function Component({postData} : {postData: any}){
    const [isLiked, setIsLiked] = useState<boolean | null>(null)
    const likeButtonRef = useRef<HTMLSpanElement | null>(null)
    const postViewUrl = `https://backend.tedooo.com/?itemId=${postData.id}`

    const handleLike = (element: React.RefObject<HTMLSpanElement>) => {
        if(element.current) element.current.style.color = isLiked ? 'black' : 'blue'
        if(element.current) setIsLiked(!isLiked)
    }

    const handlePostView = async () => ''

    return(
        <div data-user-id={postData.userId} data-shop-id={postData.shopId} className={style.post} onClick={handlePostView}>
             <section className={style.infoSection}>
                <div>
                    <img className={style.profileWrapper} src={postData.avatar} alt="image" width={50} height={50} />
                    <p><span>{postData.username}</span><br /><span style={{color: 'blue'}}>{postData.shopName}</span></p>
                </div>
                    <h4>{postData.text}</h4>
            </section>
            <div className={style.imageContainer}>
                {postData.images.map((imageUrl: any, index: number) => (
                    <>
                        <div key={index} style={{ backgroundImage: `url(${imageUrl})` }} className={style.blurBackground}>
                            <img src={imageUrl} alt="some image" />
                        </div>
                    </>
                ))}
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
