const button = document.querySelectorAll('.btn');
const votersContainer = document.querySelector('.voters-container');
const registeredVoterWrapper = document.querySelector('.register-voter-wrapper');
const voterActiveStatus = document.querySelector('.voter-active-status');


button.forEach(btn=>{
   
    btn.addEventListener('click', (e)=>{
        let buttonDataSet = e.target.dataset.button;
        // let target = e.currentTarget;
        
        button.forEach(item=>{
            if (item !== btn) {
                item.classList.remove('active')   
            } 
            else {
                item.classList.add('active')
            }

            if (buttonDataSet==='registered') {
                registeredVoterWrapper.style.display = "block"
                voterActiveStatus.style.display = "none";
            } else {
                voterActiveStatus.style.display = "block";
                registeredVoterWrapper.style.display = "none"
            }
 
        })
        
    })

})