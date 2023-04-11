import { Component } from "react";

class NewsletterDetail extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const {post} = this.props
        return(
            <div>
                <h1>{post.title}</h1>
                <img className="newsletterImage" src={post.image} alt="Newsletter" />
                <p>{post.content}</p>
            </div>
        )
    }
}

export default NewsletterDetail;