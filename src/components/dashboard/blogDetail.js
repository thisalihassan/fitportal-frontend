import React, { Fragment } from 'react';
import Breadcrumb from "../common/breadcrumb";
import blog from "../../assets/images/blog/blog.jpg";
import blog2 from "../../assets/images/blog/blog-2.jpg";
import blog3 from "../../assets/images/blog/blog-3.jpg";
import blog5 from "../../assets/images/blog/blog-5.png";
import blog6 from "../../assets/images/blog/blog-6.png";
import {MarkJecno} from "../../constant";
import { API_URL, CONFIG } from '../../services/helper';
import axios from 'axios';
const BlogDetail = () => {
    const [recipe, setRecipe] = React.useState();
    React.useEffect(async ()=> {
        CONFIG.headers.access_token = localStorage.getItem('id_token')
		const res = await axios.get(`${API_URL}/recipe`, CONFIG);
        setRecipe(res.data);
    }, [])
    return (
        <Fragment>
            <Breadcrumb title="Recipe Details" parent="Recipe" />
            <div className="container-fluid">
                <div className="row">
                    {recipe && recipe.map (item => (
                        <div className="col-md-6 col-xl-3 set-col-6">
                        <div className="card">
                            <div className="card-header">{item.title}</div> 
                            <div className="blog-box blog-grid text-center">
                                <div className="blog-details-main">
                                    <ul className="blog-social">
                                        <li className="digits">{item.date}</li>
                                        <li className="digits">by: {item.user.name}</li>
                                        <li className="digits">Reviews: {"0"}</li>
                                    </ul>
                                    <hr />
                                    <h6 className="blog-bottom-details">{item.body.substring(0,300)}</h6>
                                </div>
                            </div>
                        </div>
                    </div>    
                    ))}
                    
                </div>
            </div>
        </Fragment>
    );
};

export default BlogDetail;