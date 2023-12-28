let arr = [];
let localarr = [];
let li;
const sbtn = document.querySelector('#sbtn');
let addHere = document.querySelector('#addHere');


function appendToLeft(subject, question, cnt){

    const div1 = document.createElement('div');
    div1.className = "firstDiv";

    const div2 = document.createElement('div');
    div2.className = "secondDiv";

    const li = document.createElement('li');
    li.className = "lteen";

    const h2 = document.createElement('h2');
    h2.className = "hdo";

    const p = document.createElement('p');
    p.className = "putin";

    h2.innerText = subject;
    p.innerText = question;

    div1.append(h2,p);

    const minus = document.createElement('button');
    minus.className = "minus";
    minus.innerText = "-";

    const count = document.createElement('p');
    count.className = "count";
    count.innerText = cnt;

    const plus = document.createElement('button');
    plus.className = "plus";
    plus.innerText = "+";

    div2.append(minus, count, plus);

    li.append(div1, div2);
    addHere.append(li);
    arr.push(li);

}

function sortUL(){
    arr.sort((a,b) => {
        const x = parseInt(a.querySelector('.count').innerText);
        const y = parseInt(b.querySelector('.count').innerText);
        return y-x;
    })
    arr.forEach((li) => addHere.append(li));
}

function setCount(count){
    // local storage
    let arrobj = JSON.parse(localStorage.getItem('jmd'));
    const i = arr.findIndex((e) => e.innerText === li.innerText)

    arrobj[i].count = count.innerText;
    arrobj.sort((a,b) => b.count - a.count);

    localStorage.setItem('jmd', JSON.stringify(arrobj));

    arr[i].querySelector('.count').innerText = count.innerText;
    sortUL();
}

addHere.addEventListener('click', function(e){
    li = e.target.parentElement.parentElement;
    if(e.target.className === "minus"){
        const div = e.target.parentElement;
        const count = div.querySelector('.count');
        count.innerText -= 1;

        setCount(count);
    }
    else if(e.target.className === "plus"){
        const div = e.target.parentElement;
        const count = div.querySelector('.count');
        count.innerText = parseInt(count.innerText) + 1;

        setCount(count);
    }
    else{
        document.querySelector('#right').remove();
        createRightDiv(e); 
    
        if(localStorage.getItem('jmd')){
            let arrobj = JSON.parse(localStorage.getItem('jmd'));
            const i = arr.findIndex((e) => e.innerText === li.innerText);
            if(i >= 0){
                let resarr = arrobj[i].resarr;
                if(resarr){
                    resarr.forEach((e) => {
                        addResponse(e.name, e.comment, e.vote);
                    })
                }
            }
        }
    }
});

function addResponse(name, comment, cnt){
    const div = document.createElement('div');
    div.className = "resDiv";

    const div1 = document.createElement('div');
    div1.className = "firstDiv";

    const div2 = document.createElement('div');
    div2.className = "secondDiv";

    const h3 = document.createElement('h3');
    h3.className = "hteen";
    h3.innerText = name;

    const p = document.createElement('p');
    p.className = "putin";
    p.innerText = comment;

    div1.append(h3, p);

    const downvote = document.createElement('button');
    downvote.className = "downvote";
    downvote.innerText = "-";

    const vote = document.createElement('p');
    vote.className = "vote";
    vote.innerText = cnt;

    const upvote = document.createElement('button');
    upvote.className = "upvote";
    upvote.innerText = "+";

    div2.append(downvote, vote, upvote);
    div.append(div1, div2);


    document.querySelector('#responses').append(div);    
}

function createRightDiv(e){
    // Recreate right div
    const right = document.createElement('div');
    right.id = "right";
    document.querySelector('#parent').append(right);

    const div = document.createElement('div');
    div.id = "afterClick";

    // Append question to right
    const qes = document.createElement('h2');
    qes.innerText = "Question";
    div.append(qes);

    
    li = e.target.parentElement.parentElement;

    const div2 = document.createElement('div');

    const h2 = document.createElement('h2');
    h2.className = "hdo";
    h2.innerHTML = li.querySelector('.hdo').innerHTML;

    const p = document.createElement('p');
    p.className = "putin"
    p.innerHTML = li.querySelector('.putin').innerHTML;

    div2.append(h2, p);
    div.append(div2);

    const resolve = document.createElement('input');
    resolve.id = "resolve";
    resolve.type = "button";
    resolve.value = "Resolve";
    div.append(resolve);

    // Append response to right
    const res = document.createElement('h2');
    res.innerText = "\nResponse";
    div.append(res);

    const responses = document.createElement('div');
    responses.id = "responses";
    div.append(responses);

    // Form to Add response
    const addRes = document.createElement('h2');
    addRes.innerText = "Add Response"
    div.append(addRes);

    const inputName = document.createElement('input');
    inputName.type = "text";
    inputName.placeholder = "Enter Name";
    inputName.id = "name";
    div.append(inputName);

    div.append(document.createElement('br'));
    div.append(document.createElement('br'));

    const comment = document.createElement('textarea');
    comment.rows = "8";
    comment.placeholder = "Enter Comment";
    comment.id = "comment";
    div.append(comment);

    const submit = document.createElement('input');
    submit.id = "rsbtn";
    submit.type = "button";
    submit.value = "Submit";
    div.append(submit);

    div.append(document.createElement('br'));
    div.append(document.createElement('br'));
    
    right.append(div);
}

function sortDiv(e){
    const responses = e.target.parentElement.parentElement.parentElement;
    const arrDiv = Array.from(responses.querySelectorAll('.resDiv'));
    
    arrDiv.sort((a,b) => {
        const x = parseInt(a.querySelector('.vote').innerText);
        const y = parseInt(b.querySelector('.vote').innerText);
        return y-x;
    })
    arrDiv.forEach((div) => responses.append(div));

}

function setVote(e, vote){
    // local storage
    let div = e.target.parentElement.parentElement;
    let firstDiv = div.querySelector('.firstDiv');

    let arrobj = JSON.parse(localStorage.getItem('jmd'));
    const i = arr.findIndex(e => e.innerText === li.innerText);
    const j = arrobj[i].resarr.findIndex(e => {
        return e.name === firstDiv.querySelector('.hteen').innerText
        && e.comment === firstDiv.querySelector('.putin').innerText;
    });

    arrobj[i].resarr[j].vote = vote.innerText;
    arrobj[i].resarr.sort((a,b) => b.vote - a.vote);
    localStorage.setItem('jmd', JSON.stringify(arrobj));

    sortDiv(e);
}

document.body.addEventListener('click', function(e){

    if(e.target.id === "sbtn"){
        const subject = document.querySelector('#subject');
        const question = document.querySelector('#question');

        if(subject.value ===  "" || question.value === ""){
            alert('Please write subject!');
        }

        else{
            let obj = {};
            obj.subject = subject.value;
            obj.question = question.value;
            obj.count = "0";
            obj.resarr = new Array;
    
            // Append to left
            appendToLeft(subject.value, question.value, 0);    
            subject.value = "";
            question.value = "";
            
            // Local storage
            if(localStorage.getItem('jmd')){
                localarr = JSON.parse(localStorage.getItem('jmd'));
            }
            localarr.push(obj);
            localStorage.setItem('jmd', JSON.stringify(localarr));
        }
    }

    else if(e.target.id === "rsbtn"){
        const name = document.querySelector('#name');
        const comment = document.querySelector('#comment');

        if(name.value == "" || comment.value == ""){
            alert('Please write name');
           }

        else{
            let resObj = {};
            resObj.name = name.value;
            resObj.comment = comment.value;
            resObj.vote = "0";
            
            addResponse(name.value, comment.value, 0);
            name.value = "";
            comment.value = "";

            // local storage response
            const i = arr.findIndex((e) => e.innerText === li.innerText);
            let arrobj = JSON.parse(localStorage.getItem('jmd'));
            arrobj[i].resarr.push(resObj);
            localStorage.setItem('jmd', JSON.stringify(arrobj))

        }
    }

    else if(e.target.id === "resolve"){
        document.querySelector('#right').remove();
        const i = arr.findIndex((e) => e.innerText === li.innerText);
        arr.splice(i, 1);
        li.remove();
        createDefaultDiv();

        // Update localArr
        let arrobj = JSON.parse(localStorage.getItem('jmd'));
        arrobj.splice(i,1);
        localStorage.setItem('jmd', JSON.stringify(arrobj));
    }

    else if(e.target.id === "newFormButton"){
        document.querySelector('#right').remove();
        createDefaultDiv();
    }

    else if(e.target.className === "downvote"){
        const secondDiv = e.target.parentElement;
        const vote = secondDiv.querySelector('.vote');
        vote.innerText -= 1;

        setVote(e, vote);
    }

    else if(e.target.className === "upvote"){
        const secondDiv = e.target.parentElement;
        let vote = secondDiv.querySelector('.vote');
        vote.innerText = parseInt(vote.innerText) + 1;

        setVote(e, vote);
    }

})

function createDefaultDiv(){
    // Recreate right div
    const right = document.createElement('div');
    right.id = "right";
    document.querySelector('#parent').append(right);

    const div = document.createElement('div');
    div.id = "byDefault";

    // Append h1 and p to div in right
    const h1 = document.createElement('h1');
    h1.innerText = "Welcome to Discussion Portal !" ;

    const p = document.createElement('p');
    p.innerText = "Enter a subject and question to get started";

    // form to new question
    const subject = document.createElement('input');
    subject.id = "subject";
    subject.type = "text";
    subject.placeholder = "Subject";

    const question = document.createElement('textarea');
    question.id = "question";
    question.placeholder = "Question";
    question.rows = "12";

    const submit = document.createElement('input');
    submit.id = "sbtn";
    submit.type = "button";
    submit.value = "Submit";

    div.append(h1, p, subject);
    div.innerHTML += `<br><br>`;
    div.append(question, submit);
    right.append(div);

}

// Search Bar code
const noMatchMsg = document.createElement('h2');
noMatchMsg.className = "hdo";
noMatchMsg.innerText = "No match found";
noMatchMsg.style.display = "none";
noMatchMsg.style.borderBottom = "1px solid rgb(207, 207, 207)";

addHere.insertBefore(noMatchMsg, addHere.firstChild);
const search = document.querySelector('#searchButton');

search.addEventListener('input', function(){
    const searchValue = search.value.toLowerCase();
    let x = false;
    if(searchValue == ""){
        noMatchMsg.style.display = "none";
        arr.forEach((li) => li.style.display="flex");
    }
    else{
        arr.forEach((li)=>{
            const text = li.innerText.toLowerCase();
            const isMatch = text.includes(searchValue);
            li.style.display = isMatch ? 'flex' : 'none';
            if(isMatch){
                x = true;
            }
        })
        noMatchMsg.style.display = x ? 'none' : 'flex';
    }
})

window.addEventListener('load', function(){ 
    let arrobj = JSON.parse(localStorage.getItem('jmd'));
    if(arrobj){
    arrobj.forEach(e => {
        appendToLeft(e.subject, e.question, e.count);
    })
    }
})