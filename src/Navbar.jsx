import React from 'react'
const clearMessage = 'This clears all the data. Are You sure ?'
function Navbar() {
    const clearCache = () => {
       if(window.confirm(clearMessage)){
        localStorage.removeItem('todos');
        localStorage.removeItem('completed'); 
        window.location.reload();
       }
       else{
        return
       }
    }

  return (
    <div className='navbar'>
        <div className="nav-items container">
            <span className='fs-1'>Todos</span>
            <span>
             <button type='button' className='btn btn-danger deleteButton '
                onClick={() => clearCache()}>
                    clear cache
                </button>
            </span>
        </div>
    </div>
  )
}

export default Navbar