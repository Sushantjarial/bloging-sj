import { format } from "date-fns";
import { Blog } from "../../pages/oneBlog"
import Avatar from "./avatar"
import arrow from "../images/arrow.png"
import { useEffect, useState } from "react";

export const formatDate = (date:any) => {
    return format(new Date(date), ' MMM d yyyy'); 
};

interface BlogPost {
    post: Blog,
    hideSide: () => void
}

export default function OneBlogCard({post, hideSide}: BlogPost) {
    const [readingTime, setReadingTime] = useState<number>(0);
    const [, setIsScrolled] = useState(false);
    const [viewblogs,setviewblogs]=useState(true);

    useEffect(() => {
        const wordsPerMinute = 200;
        const textContent = post.content.replace(/<[^>]*>/g, '');
        const words = textContent.split(/\s+/).length;
        setReadingTime(Math.ceil(words / wordsPerMinute));
    }, [post.content]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
            
            const article = document.querySelector('.prose');
            if (article) {
                const articleTop = article.getBoundingClientRect().top + window.scrollY;
                const articleHeight = article.clientHeight;
                const windowHeight = window.innerHeight;
                const currentScroll = window.scrollY - articleTop + windowHeight;
                const percentageScrolled = Math.min(
                    Math.max((currentScroll / (articleHeight + windowHeight)) * 100, 0),
                    100
                );
                
                const progressBar = document.querySelector('.reading-progress') as HTMLElement;
                if (progressBar) {
                    progressBar.style.width = `${percentageScrolled}%`;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () =>{ window.removeEventListener('scroll', handleScroll);
            
        }
    }, []);

    return (
        <div className="relative bg-transparent">
            <div className="relative px-4 lg:px-24 py-8 text-slate-100 max-w-5xl mx-auto">
                <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-0 reading-progress 
                        transition-all duration-150 ease-out"></div>
                </div>

                {/* Title section */}
                <div className="relative mt-8">
                    <div className="absolute -left-4 top-1/2 w-2 h-20 bg-gradient-to-b from-green-500 to-transparent transform -translate-y-1/2"></div>
                    <div className="absolute -left-8 top-1/2 w-2 h-40 bg-gradient-to-b from-green-500 to-transparent transform -translate-y-1/2 opacity-30"></div>
                    
                   
                    
                    <h1 className="text-4xl md:text-6xl font-extrabold py-8 text-white">
                        {post.title}
                    </h1>
                </div>
                
                <div onClick={()=>{
                  setviewblogs(!viewblogs)
                  hideSide()}} 
                    className="flex items-center my-8 group cursor-pointer relative overflow-hidden rounded-xl">
                    {/* Desktop-only effects */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-gray-800/50 to-transparent opacity-0 
                        group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="hidden md:block absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 
                        group-hover:opacity-20 blur-xl transition-all duration-500"></div>
                    
                    <div className="flex items-center p-4 md:p-6 relative z-10 w-full">
                        <div className="relative">
                            <Avatar name={post.author.firstName.charAt(0).toUpperCase()} big={true} />
                            <div className="hidden md:block absolute inset-0 bg-green-500/20 rounded-full blur-xl 
                                group-hover:bg-green-500/30 transition-all duration-300"></div>
                        </div>
                        
                        <div className="flex-col justify-start px-4 md:px-6">
                            <div className="text-lg md:text-xl font-semibold text-white md:group-hover:text-green-300 
                                transition-colors duration-300">
                                {post.author.firstName + " " + post.author.lastName}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                    {formatDate(post.createdAt)}
                                </div>
                                <div className="hidden md:flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    {readingTime} min read
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex ml-auto items-center gap-2">
                            <span className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 
                                transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                {(viewblogs)?"viewblogs":"hideblogs"}
                            </span>
                            <img src={arrow} 
                                className="w-8 h-8 opacity-70 group-hover:opacity-100 group-hover:translate-x-2 
                                    transition-all duration-300" 
                                alt="View author profile"
                            />
                        </div>
                        
                        <img src={arrow} 
                            className="md:hidden ml-auto w-6 h-6 opacity-70" 
                            alt="View author profile"
                        />
                    </div>
                </div>

                {/* Content section */}
                <div className="relative">
                    <div className="prose prose-lg prose-invert max-w-none mt-8 leading-relaxed text-gray-100
                        prose-headings:text-white
                        prose-p:text-gray-200 prose-strong:text-green-300 prose-em:text-green-200
                        prose-a:text-green-400 prose-a:no-underline hover:prose-a:text-green-300 prose-a:transition-colors
                        prose-blockquote:border-green-500 prose-blockquote:bg-gray-800/30 
                        prose-blockquote:rounded-r-lg prose-blockquote:py-2
                        prose-code:text-green-300 prose-code:bg-gray-800/50 prose-code:rounded 
                        prose-code:px-2 prose-code:py-0.5
                        prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-700
                        prose-img:rounded-xl prose-img:shadow-lg hover:prose-img:shadow-green-500/10
                        prose-hr:border-gray-800"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </div>
        </div>
    )
}