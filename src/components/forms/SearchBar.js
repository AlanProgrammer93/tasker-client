import React from 'react'

const SearchBar = ({ keyword, setKeyword }) => {
    return (
        <div className='m-2'>
            <input
                type="search"
                className='form-control'
                placeholder='Search'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
            />
        </div>
    )
}

export default SearchBar