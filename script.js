// // ---- 1 ---- //

fetch('https://reqres.in/api/unknown', {
    method: 'GET'
})
    .then(function (userInfo) {
        if (userInfo.status !== 200) {
            throw 'error';
        }
        return userInfo.json()
    })
    .then(function (userDataInfo) {
        userDataInfo.data.forEach(element => {
            let liItem = document.createElement('li');
            liItem.innerText = `Color Name: ${element.name},  HEX Color: ${element.color}`;

            document.getElementById('ul-item').appendChild(liItem)
        });
    })
    .catch(function (errorFetch) {
        console.log(errorFetch);
    })


// // ---- 2 ---- //


function getUserInfo() {
    let requist = new XMLHttpRequest();

    requist.open('GET', "https://reqres.in/api/users?page=2");

    requist.addEventListener('load', function () {
        let userInfoTwo = this.responseText;
        let userDataInfoTwo = JSON.parse(userInfoTwo);
        let ulItemTwo = document.createElement('ul');


        userDataInfoTwo.data.forEach(element => {
            let liItem = document.createElement('li');
            liItem.innerText = `First Name: ${element.first_name},  Last Name: ${element.last_name}, Email: ${element.email}`;

            ulItemTwo.appendChild(liItem)
        });
        document.getElementById('user-info').appendChild(ulItemTwo);
    })
    requist.send();
}
getUserInfo();

// ---- 3 ---- //

let currentPage = 1;
let totalPages;

function getUsersInfoFetch(page) {
    fetch("https://reqres.in/api/users?page=" + page, {
        method: "GET",
    })
        .then(function (responseFetch) {
            console.log(responseFetch);
            if (responseFetch.status !== 200) {
                throw responseFetch.status;
            }
            return responseFetch.json();
        })
        .then(function (responseDataFetch) {
            console.log(responseDataFetch);


            const fragment = document.createDocumentFragment();

            responseDataFetch.data.forEach((element) => {
                let li = document.createElement("li");
                li.classList.add("li-item");
                // li.innerText = element.first_name + " " + element.last_name;

                let userInfoName = document.createElement("p");
                userInfoName.innerText = `${element.first_name} ${element.last_name}`;

                let imgElement = document.createElement("img");
                // imgElement.setAttribute('src', element.avatar);
                imgElement.src = `${element.avatar}`;

                imgElement.setAttribute("alt", "user-image");

                li.appendChild(userInfoName);
                li.appendChild(imgElement);

                fragment.appendChild(li);
            });


            document.getElementById('ul-item').innerHTML = " ";
            document.getElementById("ul-item").appendChild(fragment);
            totalPages = responseDataFetch.total_pages;
        })
        .catch(function (errorFetch) {
            console.log(errorFetch);
            if (errorFetch == 404) {
                let p = document.createElement('p');
                p.textContent = 'Page Not Found';

                document.getElementById('userInfo').appendChild(p);
            }
        });
}

// load prec & next users
document.getElementById('prev').addEventListener('click', function () {
    if (currentPage == 1) {
        return;
    }
    currentPage -= 1;
    getUsersInfoFetch(currentPage);
})

document.getElementById('next').addEventListener('click', function () {
    if (totalPages == currentPage) {
        return;
    }
    currentPage += 1;
    getUsersInfoFetch(currentPage);
})

getUsersInfoFetch(currentPage);
