import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
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
						recipe.map((item) => (
							<div className='col-md-6 col-xl-3 set-col-6'>
								<a href={`http://localhost:3000/endless/dashboard/recpie/${item._id}`} className='card'>
									<div className='card-header'>{item.title}</div>
									<div className='blog-box blog-grid text-center'>
										<div className='blog-details-main'>
											<ul className='blog-social'>
												<li className='digits'>{item.date}</li>
												<li className='digits'>by: {item.user.name}</li>
												<li className='digits'>Reviews: {'0'}</li>
											</ul>
											<hr />
											<h6 className='blog-bottom-details'>{item.body.substring(0, 300)}</h6>
										</div>
									</div>
								</a>
							</div>
						))}
				</div>
			</div>
		</Fragment>
	);
};

export default BlogDetail;
