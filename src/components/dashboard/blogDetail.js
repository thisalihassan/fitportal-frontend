import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { API_URL, CONFIG } from '../../services/helper';
import SearchField from 'react-search-field';

import axios from 'axios';
const BlogDetail = () => {
	const [recipe, setRecipe] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		async function myAPI() {
			CONFIG.headers.access_token = localStorage.getItem('id_token');
			const res = await axios.get(`${API_URL}/recipe`, CONFIG);
			setRecipe(res.data);
			setFilteredData(res.data);
		}
		myAPI();
	}, []);

	const stringSearch = (str, word) => {
		str = str.toUpperCase();
		word = word.toUpperCase();
		var count = 0;
		for (var i = 0; i < str.length; i++) {
			for (var j = 0; j < word.length; j++) {
				if (word[j] !== str[i + j]) break;
				if (j === word.length - 1) count++;
			}
		}
		return count;
	};

	const onTitleSearch = (text) => {
		if (text) {
			const myFilteredData = recipe.filter((item) => stringSearch(item.title, text));
			setFilteredData(myFilteredData);
		} else {
			setFilteredData(recipe);
		}
	};

	return (
		<Fragment>
			<Breadcrumb title='Recipe Details' parent='Recipe' />
			<div className='container-fluid'>
				<SearchField placeholder='Search...' onChange={onTitleSearch} classNames='test-class' />
				<div className='row mt-2'>
					{filteredData &&
						filteredData.map((item, index) => (
							<div key={index} className='col-md-6 col-xl-3 set-col-6'>
								<Link to={`/dashboard/recpie/${item._id}`} className='card'>
									<div className='card-header'>{item.title}</div>
									<div style={{ display: 'flex', height: 'auto', justifyContent: 'center' }}>
										{item.picture && <img style={{ height: 'auto', width: 130 }} src={item.picture} alt='' />}
									</div>

									<div className='blog-box blog-grid text-center'>
										<div className='blog-details-main'>
											<ul className='blog-social'>
												<li className='digits'>{moment(item.date).format('LL')}</li>
												<li className='digits'>by: {item.user.name}</li>
												<li className='digits'>Reviews: {item.rating}</li>
												<li className='digits'>Calories: {item.calories}</li>
												<li className='digits'>Carbs: {item.carbs}</li>
												<li className='digits'>Fats: {item.fats}</li>
												<li className='digits'>Proteins: {item.proteins}</li>
											</ul>
											<hr />
											<h6 className='blog-bottom-details'>{item.body.substring(0, 20) + '...'}</h6>
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
