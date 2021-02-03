const addGoodForm = document.querySelector('#addgood');
const goodsListUl = document.querySelector('#goodslist');

function addGoodHtml({
  _id, name, price, currency, count,
}) {
  const pName = document.createElement('p');
  const pPrice = document.createElement('p');
  const pCurrency = document.createElement('p');
  const pCount = document.createElement('p');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const liGoodID = document.createElement('li');
  const ulGoodsList = document.querySelector('#goodslist');

  pName.innerText = `Название товара: ${name}`;
  pPrice.innerText = `Цена: ${price}`;
  pCurrency.innerText = `Валюта: ${currency}`;
  pCount.innerText = `Количество: ${count}`;

  editButton.innerText = 'Редактировать';
  editButton.classList.add('edit');
  deleteButton.innerText = 'Удалить';
  deleteButton.classList.add('delete');

  liGoodID.setAttribute('data-goodid', _id);
  liGoodID.append(pName);
  liGoodID.append(pPrice);
  liGoodID.append(pCurrency);
  liGoodID.append(pCount);
  liGoodID.append(editButton);
  liGoodID.append(deleteButton);
  ulGoodsList.append(liGoodID);
}

if (addGoodForm) {
  addGoodForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const price = event.target.price.value;
    const currency = event.target.currency.value;
    const count = event.target.count.value;

    const errorMessageDiv = document.querySelector('#errormessage');

    if (!name || !price || !currency || !count) {
      errorMessageDiv.innerText = 'Пожалуйста, заполни все поля.';
      return;
    }

    errorMessageDiv.innerText = '';

    const response = await fetch('/goods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, price, currency, count,
      }),
    });

    if (response.status !== 200) {
      errorMessageDiv.innerText = 'Не удалось создать товар. Обратитесь к администратору';
      return;
    }

    errorMessageDiv.innerText = '';
    const { good } = await response.json();
    addGoodHtml(good);
  });
}

if (goodsListUl) {
  goodsListUl.addEventListener('click', async (event) => {
    if (!event.target.classList.contains('delete')) {
      return;
    }

    const goodLi = event.target.parentElement;

    const response = await fetch('/goods', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goodID: goodLi.dataset.goodid }),
    });

    if (response.status !== 200) {
      const errorMessageDiv = document.querySelector('#errormessage');
      errorMessageDiv.innerText = 'Сорня, нишмогла я удалить.';
      return;
    }

    goodLi.remove();
  });
}
