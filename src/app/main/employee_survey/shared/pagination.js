import React from 'react'

function Pagination({postsPerPage,totalCards,paginate,clicked}) {

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalCards/postsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="flex w-full space-x-20">
                {pageNumbers.map((number) => (
                    <li key={number} 
                        className="rounded-full w-40 h-40 flex items-center justify-center border-blue-A700 bg-blue-300 text-blue-900 cursor-pointer" 
                        onClick={() => paginate(number)}>
                            {number}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
