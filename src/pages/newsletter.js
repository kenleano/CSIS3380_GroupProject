import { Component } from "react";
import "../css/newsletter.css";
import NewsletterPosts from "../data/newsletter.json"
import NewsletterItem from "../components/newsletterItem"
import NewsletterDetail from "../components/newsletter_detail";

class Newsletter extends Component {

    constructor (props) {
        super(props)
        this.state = {postId: 1}
        this.handlePostCallback = this.handlePostCallback.bind(this)
    }

    handlePostCallback (id) {
        this.setState({
            postId: id
        })
    }

    render () {
        return(
            <div className="NewsletterContent">
                <div className="PostList">
                    {
                        NewsletterPosts.map((postDetail, index) => {
                            return <NewsletterItem
                                    post = {postDetail}
                                    key={`post-list-key ${index}`}
                                    dataCallBack = {this.handlePostCallback}/>
                        })
                    }
                </div>
                <div className="PostContent">
                    <NewsletterDetail
                            post = {NewsletterPosts.find((post) => {
                                return this.state.postId === post.id
                            })}
                            />
                </div>
            </div>
        )
    }
}


export default Newsletter;
