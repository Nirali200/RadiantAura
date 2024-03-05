
const ver = document.querySelector('.vbtn');
const details = document.querySelectorAll('.details');

ver.addEventListener('click',()=>{
        details[1].classList.remove('edited');
        details[0].classList.add('profdetails');
        ver.value="Submit";
})


const otpBlock = document.querySelector('.otpver');