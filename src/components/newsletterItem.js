import { Component } from "react";

class NewsletterItem extends Component {
    constructor(props) {
        super(props)
        this.titleWasClicked = this.titleWasClicked.bind(this)
    }

    titleWasClicked(event) {
        event.preventDefault()
        const { dataCallBack } = this.props
        dataCallBack(this.props.post.id)
    }

    render() {
        const { post } = this.props
        return (
            <div className="titleContainer">
                <h2 onClick={this.titleWasClicked}>Week {post.id}</h2>
            </div>
        )
    }
}

export default NewsletterItem;