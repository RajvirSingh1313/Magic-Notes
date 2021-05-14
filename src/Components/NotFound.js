import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <div className="not-found ml-20">
            <h2 className="text-3xl">Sorry</h2>
            <p className="text-2xl">That page cannot be found</p>
            <Link className="text-2xl text-pink-500"to="/">Back to the homepage...</Link>
        </div>
    )
}
