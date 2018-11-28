'use strict';

const frm = document.querySelector('#mediaform');
const updatefrm = document.querySelector('#updateform');
const list = document.querySelector('#imagelist');
const search = document.querySelector('#searchform button');
/*
const img = document.querySelector('#image');
const aud = document.querySelector('#aud');
const vid = document.querySelector('#vid');
*/

const fillUpdate = (image) => {
  console.log(image);
  document.querySelector('#updateform input[name=mID]').value = image.mID;
  document.querySelector(
      '#updateform input[name=category]').value = image.category;
  document.querySelector('#updateform input[name=title]').value = image.title;
  document.querySelector(
      '#updateform input[name=details]').value = image.details;
  document.querySelector('#updateform button').removeAttribute('disabled');
};

const getImages = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    // clear list before adding upated data
    list.innerHTML = '';
    json.forEach((image) => {
      const li = document.createElement('li');
      const title = document.createElement('h3');
      title.innerHTML = image.title;
      li.appendChild(title);
      const img = document.createElement('img');
      img.src = 'thumbs/' + image.thumbnail;
      img.addEventListener('click', () => {
        fillUpdate(image);
      });
      li.appendChild(img);
      const a = document.createElement('a');
      a.innerText = 'delete';
      a.setAttribute('href', '/images/' + image.mID);
      a.addEventListener('click', (evt) => {
        evt.preventDefault();
        const url = evt.target.href;
        const settings = {
          method: 'delete',
        };
        fetch(url, settings).then((response)=>{
          return response.json();
        }).then((json)=>{
          console.log(json);
          getImages();
        });
      });
      li.appendChild(a);
      list.appendChild(li);
    });
  });
};

const sendForm = (evt) => {
  evt.preventDefault();
  const fd = new FormData(frm);
  const settings = {
    method: 'post',
    body: fd,
  };

  fetch('/upload', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    // update list
    getImages();
  });
};

const sendUpdate = (evt) => {
  evt.preventDefault();
  // get data from updatefrm and put it to body
  const data = JSON.stringify([
    updatefrm.querySelector('input[name="category"]').value,
    updatefrm.querySelector('input[name="title"]').value,
    updatefrm.querySelector('input[name="details"]').value,
    updatefrm.querySelector('input[name="mID"]').value,
  ]);
  const settings = {
    method: 'PATCH',
    body: data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };
  // app.patch('/images'.... needs to be implemented to index.js (remember body-parser)
  fetch('/images', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    updatefrm.reset();
    document.querySelector('#updateform button').
        setAttribute('disabled', 'disabled');
    // update list
    getImages();
  });
};

frm.addEventListener('submit', sendForm);
updatefrm.addEventListener('submit', sendUpdate);

getImages();
