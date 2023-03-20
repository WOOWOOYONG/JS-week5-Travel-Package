// let data = [
//   {
//     id: 0,
//     name: '肥宅心碎賞櫻3日',
//     imgUrl:
//       'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
//     area: '高雄',
//     description: '賞櫻花最佳去處。肥宅不得不去的超讚景點！',
//     group: 87,
//     price: 1400,
//     rate: 10,
//   },
//   {
//     id: 1,
//     name: '貓空纜車雙程票',
//     imgUrl:
//       'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
//     area: '台北',
//     description:
//       '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
//     group: 99,
//     price: 240,
//     rate: 2,
//   },
//   {
//     id: 2,
//     name: '台中谷關溫泉會1日',
//     imgUrl:
//       'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
//     area: '台中',
//     description:
//       '全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
//     group: 20,
//     price: 1765,
//     rate: 7,
//   },
// ];
let data = [];

//API url
const url =
  'https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json';

//畫面初始化
const init = () => {
  axios
    .get(url)
    .then((res) => {
      data = res.data;
      renderData(data);
    })
    .catch((err) => console.log(err.message));
};

init();

//篩選地區
const ticketArea = document.querySelector('.ticketCard-area');

const filterArea = (data, area) => {
  if (area === '全部地區') {
    renderData(data);
    return;
  }
  const filteredData = data.filter((item) => {
    if (item.area === area) {
      return item;
    } else if (!area) {
      return item;
    }
  });
  renderData(filteredData);
};

const regionSearchSelect = document.querySelector('.regionSearch');
regionSearchSelect.addEventListener('change', (e) => {
  let region = e.target.value;
  filterArea(data, region);
});

//更新資料搜尋筆數
const updateSearchNum = (searchNum) => {
  const searchText = document.querySelector('#searchResult-text');
  searchText.textContent = `本次搜尋共 ${searchNum} 筆資料`;
};

//資料渲染
const renderData = (data) => {
  let str = '';
  data.forEach((item) => {
    const { name, imgUrl, area, description, group, price, rate } = item;
    str += `<li class="ticketCard">
             <div class="ticketCard-img">
              <a href="#">
                <img
                  src=${imgUrl}
                  alt=""
                />
              </a>
              <div class="ticketCard-region">${area}</div>
              <div class="ticketCard-rank">${rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${name}</a>
                </h3>
                <p class="ticketCard-description">
                  ${description}
                </p>
              </div>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num"> ${group} </span> 組
                </p>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">${price}</span>
                </p>
              </div>
            </div>
          </li>`;
  });
  ticketArea.innerHTML = str;
  const dataNum = data.length;
  updateSearchNum(dataNum);
};

//表單驗證
const ticketNameInput = document.querySelector('#ticketName');
const ticketImgUrlInput = document.querySelector('#ticketImgUrl');
const ticketRegionInput = document.querySelector('#ticketRegion');
const ticketPriceInput = document.querySelector('#ticketPrice');
const ticketNumInput = document.querySelector('#ticketNum');
const ticketRateInput = document.querySelector('#ticketRate');
const ticketDescriptionInput = document.querySelector('#ticketDescription');

const setError = (input, message) => {
  const msgArea = document.querySelector(`#${input}-message`);
  msgArea.innerText = message;
};

const setSuccess = (input) => {
  const msgArea = document.querySelector(`#${input}-message`);
  msgArea.innerText = '';
};

const errMsg = '此為必填欄位';
const rateMsg = '星級請輸入 1-10 分';
let rateCheck = true;

const checkInputs = () => {
  const ticketName = ticketNameInput.value;
  const imgUrl = ticketImgUrlInput.value;
  const area = ticketRegionInput.value;
  const price = ticketPriceInput.value;
  const group = ticketNumInput.value;
  const rate = ticketRateInput.value;
  const description = ticketDescriptionInput.value;
  if (ticketName === '') {
    setError('ticketName', errMsg);
  } else {
    setSuccess('ticketName');
  }
  if (imgUrl === '') {
    setError('ticketImgUrl', errMsg);
  } else {
    setSuccess('ticketImgUrl');
  }
  if (area === '') {
    setError('ticketRegion', errMsg);
  } else {
    setSuccess('ticketRegion');
  }
  if (price === '') {
    setError('ticketPrice', errMsg);
  } else {
    setSuccess('ticketPrice');
  }
  if (group === '') {
    setError('ticketNum', errMsg);
  } else {
    setSuccess('ticketNum');
  }
  if (rate === '') {
    setError('ticketRate', errMsg);
  } else if (Number(rate) > 10 || Number(rate) < 1) {
    setError('ticketRate', rateMsg);
    rateCheck = false;
  } else {
    setSuccess('ticketRate');
    rateCheck = true;
  }
  if (description === '') {
    setError('ticketDescription', errMsg);
  } else {
    setSuccess('ticketDescription');
  }
};

//新增表格
const addTicketForm = document.querySelector('.addTicket-form');
const addTicketBtn = document.querySelector('.addTicket-btn');

const addToData = () => {
  const ticketName = ticketNameInput.value;
  const imgUrl = ticketImgUrlInput.value;
  const area = ticketRegionInput.value;
  const price = Number(ticketPriceInput.value);
  const group = Number(ticketNumInput.value);
  const rate = Number(ticketRateInput.value);
  const description = ticketDescriptionInput.value;
  checkInputs();
  if (
    ticketName &&
    imgUrl &&
    area &&
    price &&
    group &&
    rate &&
    rateCheck &&
    description
  ) {
    let obj = {
      name: ticketName,
      id: Date.now(),
      imgUrl,
      area,
      description,
      group,
      price,
      rate,
    };
    data.push(obj);
    renderData(data);
    addTicketForm.reset();
    regionSearchSelect.selectedIndex = 0;
  } else {
    alert('請輸入正確資料');
    return;
  }
};

addTicketBtn.addEventListener('click', addToData);
