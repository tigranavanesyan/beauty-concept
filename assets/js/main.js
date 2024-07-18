const categoryBtns = document.querySelectorAll('.category-btn')
const mainCategoryBlock = document.querySelector('.main-category-block')

let nestedLevel = 1

categoryBtns.forEach((el)=>{
    el.addEventListener('click',listener)
})

function clickOnBtn(data,el){
    const newUl = document.createElement('ul');
    newUl.classList.add('active')
    newUl.dataset.nestedLevel = nestedLevel.toString()
    nestedLevel++
    mainCategoryBlock.classList.add('open2')
    data.forEach((item)=>{
        if(item.name){
            createLi( item.name,newUl)
        } else{
            let name1 = Object.keys(item)[0]
            createLi( name1,newUl,item[name1])
        }
    })
    if(!window.matchMedia("(max-width: 800px)").matches){
        mainCategoryBlock.appendChild(newUl)
    } else {
        el.appendChild(newUl)
    }
}


function createLi(text,locationElement,sub){
    const newLi = document.createElement('li');
    newLi.innerText = text
    newLi.dataset.name = text
    newLi.classList.add('category-btn')

    if(sub){
        newLi.dataset.sub = JSON.stringify(sub)
        newLi.addEventListener('click',listener)
    } else {
        newLi.addEventListener('click',(e)=>{
            if(!window.matchMedia("(max-width: 800px)").matches){

                changeActiveBtn(e)
                ulActivePrev(e)
            } else {
                console.log('www')
            }

        })

    }
    locationElement.appendChild(newLi)
}

function dataAttrToObj(elem){
    const dataSub = elem.dataset.sub;
    const jsonFormat = dataSub.replace(/'/g, '"');
    return JSON.parse(jsonFormat);
}

function listener(elem){
    const targetElement = elem.target.closest('.category-btn');
    if (elem.target.classList.contains("activeBtn")){
        ulActivePrev(elem)
        // return
    }
    const categoryUl = document.querySelector('.main-category-block ul.active')
    categoryUl?.classList.remove('active')

    const categoryLi = document.querySelectorAll('.main-category-block ul li')
    categoryLi[categoryLi.length-1].classList.remove('activeBtn')

    changeActiveBtn(elem)


    if (targetElement.dataset.sub) {
        const data = dataAttrToObj(targetElement);
        checkNestedLevel(elem)
        clickOnBtn(data,targetElement)
    }
}

function checkNestedLevel(el){
    const targetElement = el.target.closest('ul');
    let currentLevel = +targetElement.dataset.nestedLevel+1 || 1

    if (currentLevel < nestedLevel){
        const categoryUl = document.querySelectorAll('.main-category-block ul')

        categoryUl[categoryUl.length-1].remove()
        nestedLevel--
        checkNestedLevel(el)
    }
}

function changeActiveBtn(el){
    const parentUl = el.target.closest('ul')
    parentUl.querySelector('.activeBtn')?.classList.remove('activeBtn')

    const targetBtn = el.target.closest('.category-btn');
    targetBtn.classList.add('activeBtn')
}

function ulActivePrev(e){
    const parentUl = e.target.closest('ul')
    const categoryUl = document.querySelectorAll('.main-category-block ul')
    if (categoryUl.length > 1 && parentUl !== categoryUl[categoryUl.length-1]){
        categoryUl[categoryUl.length-2].classList.add('active')
        categoryUl[categoryUl.length-1].remove()
        nestedLevel--
    }
}
