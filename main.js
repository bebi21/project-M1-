let listOrder = document.getElementById("listOrder");
let currentUser = localStorage.getItem("currentUser");
if (currentUser == null) {
  window.location.href = "login.html";
}

/* let listItem = [
  {
    id: 1,
    name: "Trà Sữa Đậu Đỏ",
    price: 50000,
    img: "./img/tra sua/tra sua 4.png",
    stock: 50,
  },
  {
    id: 2,
    name: "Trà Sữa Đậu Đỏ",
    price: 65000,
    img: "./img/tra sua/tra sua 3.png",
    stock: 21,
  },
  {
    id: 3,
    name: "Trà Sữa Đậu Đỏ",
    price: 45000,
    img: "./img/tra sua/tra sua 6.png",
    stock: 31,
  },
  {
    id: 4,
    name: "Trà Sữa Đậu Đỏ",
    price: 35000,
    img: "./img/tra sua/tra sua 5.png",
    stock: 41,
  },
  {
    id: 5,
    name: "Trà Sữa Đậu Đỏ",
    price: 23000,
    img: "./img/tra sua/tra sua 3.png",
    stock: 11,
  },
  {
    id: 6,
    name: "Trà Sữa Đậu Đỏ",
    price: 43000,
    img: "./img/tra sua/tra sua 6.png",
    stock: 21,
  },
  {
    id: 7,
    name: "Trà Sữa Đậu Đỏ",
    price: 70000,
    img: "./img/tra sua/tra sua 4.png",
    stock: 18,
  },
  {
    id: 8,
    name: "Trà Sữa Đậu Đỏ",
    price: 70000,
    img: "./img/tra sua/tra sua 4.png",
    stock: 28,
  },
];
localStorage.setItem("listItem", JSON.stringify(listItem)); */
let arrListItem = JSON.parse(localStorage.getItem("listItem"));
function render() {
  let text = "";

  for (let i = 0; i < arrListItem.length; i++) {
    text += `
        <div>
        <img src="${arrListItem[i].img}" alt="" />
        <p>${arrListItem[i].name}</p>
        <p>gia ${arrListItem[i].price}</p>
        <button onclick="buy(${arrListItem[i].id})">mua</button>
      </div>
   
        `;
  }
  listOrder.innerHTML = text;
}
render();

// function  mua hang
/* 
các bước làm khi  đi  chợ ,  mua hàng

b1 Lấy giỏ hàng

dựa  vào curentUser lưu  trên  local 

b2 lấy


*/
function buy(id) {
  //  lấy tên người dùng trên  local

  // product ở đây  là lưu  sản phẩm mà người dùng muốn mua căn cứ theo  ID của sản phẩm
  let product;
  // users ở đây là  danh  sách người dùng đã tạo  tải khoản thành công
  let users = JSON.parse(localStorage.getItem("users"));
  // vòng for ở đây dùng để lấy ra sản phẩm mà người dùng chọn  (để bỏ vào giỏ của người dùng)
  for (let i = 0; i < arrListItem.length; i++) {
    if (arrListItem[i].id == id) {
      product = arrListItem[i];
      break;
    }
  }
  // vòng for ở đây duyệt mảng users  khi đăng kí kiểm tra xem cái tên (currentUser)
  // của người dùng login trùng với cái username trong mảng users
  for (let i = 0; i < users.length; i++) {
    if (users[i].userName == currentUser) {
      // giỏ hàng là cái này   users[i].cart
      //biến check kiểm tra
      let check = true;
      for (let j = 0; j < users[i].cart.length; j++) {
        //   cái này để lọc  qua giỏ hàng nếu không có thì push vào giỏ hàng
        // nếu có thì tăng phần tử đó lên
        if (product.id == users[i].cart[j].id) {
          users[i].cart[j] = {
            ...product,
            quantity: ++users[i].cart[j].quantity,
          };
          check = false;
          localStorage.setItem("users", JSON.stringify(users));
          break;
        }
      }
      // nếu biến check là true thì chưa có sản phẩm
      // nếu là false thì đã có sản phẩm và tăng  sản phẩm lên 1 lần (đã tăng  lên  ở dòng 119)
      // và không chạy
      if (check) {
        let productDetail = { ...product, quantity: 1 };
        users[i].cart.push(productDetail);
        localStorage.setItem("users", JSON.stringify(users));
      }
    }
  }
}
