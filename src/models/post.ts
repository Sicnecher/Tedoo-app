export interface PostModel {
    id: string;
    shopId: string;
    userId: string;
    shopName: string;
    username: string;
    avatar: string;
    didLike: boolean;
    text: string;
    date: string;
    images: string[];
    likes: number;
    premium: boolean;
    comments: number;
}