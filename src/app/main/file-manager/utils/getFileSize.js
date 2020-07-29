import React, {useState} from 'react';
import * as remote from 'remote-file-size';

	function formatBytes(a,b=2){
		if(0===a)return"0 Bytes";
		const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));
		return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]
    }
function getFileSize(filename) {
    const [fileSize, setFileSize] = useState('');
    
	remote(filename, function(err, size) {
		console.log(formatBytes(size));
		// => 1548
		setFileSize(formatBytes(size));
	  });
	return fileSize;
}

export default getFileSize;