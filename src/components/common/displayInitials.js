import React, {useEffect} from 'react';

const DisplayInitials = ({name, size, classNames, picID}) => {
    useEffect(() => {
        let initials = ''
        if (name) {
            let full_name = name.split(" ");
                initials = full_name[0][0];
            if (full_name.length >1) {
                initials += full_name[1][0];
            }
        }
      
        document.getElementById("profilePicUser"+picID).innerHTML = initials;
    }, [name])

    return (
       <div style={{color:'black', height: size, justifyContent: 'center',
        display: 'flex',  border: '1px solid'}}
         className={`img-${size} rounded-circle `+ classNames}><p style={{fontSize: size < 65? 30: 40}} id={'profilePicUser'+picID}></p></div>
    );
};

export default DisplayInitials;