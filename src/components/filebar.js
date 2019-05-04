import React from 'react';
import {Link} from 'react-router-dom';
import "./css/filebar.css";
/*NEEDED
-New File
-Load File
-Delete File
-Instructions
*/
export default function filebar()
{
    return(<nav role="menu" className="fileBar">
    <Link to='/instructions' className="entry"><h3>Instructions</h3></Link>
    <Link to='/menu' className="entry"><h3>Load/Delete</h3></Link>
    <Link to="/" className="entry"><h3>Front Page</h3></Link>
    </nav>);
}