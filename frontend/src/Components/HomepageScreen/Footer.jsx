import React from 'react'

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <> 
        <div class="wave-container wave">
            <p>© {year} Sakshi Rai • All Rights Reserved </p>
        </div>
    </>
  )
}

export default Footer