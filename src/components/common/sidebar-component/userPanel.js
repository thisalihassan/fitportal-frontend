import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Edit } from 'react-feather';
import DisplayInitials from '../displayInitials';

const UserPanel = ({ name,avatar, role,id }) => {
	
	return (
		<Fragment>
			<div className='sidebar-user text-center'>
				<div style={{textAlign: 'center',
				justifyContent: 'center',
				display: 'flex'}}>
				
				{avatar ? <img className="img-60 rounded-circle lazyloaded blur-up" alt="" src={avatar} />: <DisplayInitials classNames='img-60 rounded-circle lazyloaded blur-up' picID={1} size={60} name={name} />}
					
				
					<div className='profile-edit'>
						<Link to={"/dashboard/users/userEdit/" + id}>
							<Edit />
						</Link>
					</div>
				</div>
				<h6 className='mt-3 f-14'>{name}</h6>
				<p>{role}.</p>
			</div>
		</Fragment>
	);
};

export default UserPanel;
