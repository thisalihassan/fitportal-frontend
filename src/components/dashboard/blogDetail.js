import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import moment from 'moment'
import {Link} from 'react-router-dom'
import { API_URL, CONFIG } from '../../services/helper';
import axios from 'axios';
const BlogDetail = () => {
	const [recipe, setRecipe] = React.useState();

	useEffect(() => {
		async function myAPI() {
			CONFIG.headers.access_token = localStorage.getItem('id_token');
			const res = await axios.get(`${API_URL}/recipe`, CONFIG);
			setRecipe(res.data);
		}
		myAPI();
	}, []);

	return (
		<Fragment>
			<Breadcrumb title='Recipe Details' parent='Recipe' />
			<div className='container-fluid'>
				<div className='row'>
					{recipe &&
						recipe.map((item, index) => (
							<div key={index} className='col-md-6 col-xl-3 set-col-6'>
								<Link to={`/dashboard/recpie/${item._id}`} className='card'>
									<div className='card-header'>{item.title}</div>
									<div className='blog-box blog-grid text-center'>
										<div className='blog-details-main'>
											<ul className='blog-social'>
												<li className='digits'>{moment(item.date).format("LL")}</li>
												<li className='digits'>by: {item.user.name}</li>
												<li className='digits'>Reviews: {item.rating}</li>
											</ul>
											<hr />
											<h6 className='blog-bottom-details'>{item.body.substring(0, 50) + '...'}</h6>
										</div>
									</div>
								</Link>
							</div>
						))}
				</div>
			</div>
		</Fragment>
	);
};

export default BlogDetail;
