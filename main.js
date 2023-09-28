let listOrder = document.getElementById("listOrder");
let currentUser = localStorage.getItem("currentUser");

function logout() {
  localStorage.removeItem("currentUser");
}

let listItem1 = [
  {
    id: 1,
    name: "Trà Sữa Đậu Đỏ1",
    price: 50000,
    img: "./img/tra sua/tra sua 4.png",
    stock: 50,
  },
  {
    id: 2,
    name: "Trà Sữa Đậu Đỏ2",
    price: 65000,
    img: "./img/tra sua/tra sua 3.png",
    stock: 21,
  },
  {
    id: 3,
    name: "Trà Sữa Đậu Đỏ3",
    price: 45000,
    img: "./img/tra sua/tra sua 6.png",
    stock: 31,
  },
  {
    id: 4,
    name: "Trà Sữa Đậu Đỏ4",
    price: 35000,
    img: "./img/tra sua/tra sua 5.png",
    stock: 41,
  },
  {
    id: 5,
    name: "Trà Sữa Đậu Đỏ53",
    price: 23000,
    img: "./img/tra sua/tra sua 3.png",
    stock: 11,
  },
  {
    id: 6,
    name: "Trà Sữa Đậu Đỏ61",
    price: 43000,
    img: "./img/tra sua/tra sua 6.png",
    stock: 21,
  },
  {
    id: 7,
    name: "Trà Sữa Đậu Đỏ66",
    price: 70000,
    img: "./img/tra sua/tra sua 4.png",
    stock: 18,
  },
  {
    id: 8,
    name: "Trà Sữa Đậu Đỏ55",
    price: 70000,
    img: "./img/tra sua/tra sua 4.png",
    stock: 28,
  },
];
localStorage.setItem("listItem", JSON.stringify(listItem1));
let arrListItem = JSON.parse(localStorage.getItem("listItem"));
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
function render(loc) {
  let text = "";

  for (let i = 0; i < loc.length; i++) {
    text += `
        <div>
        <img src="${loc[i].img}" alt="" />
        <p>${loc[i].name}</p>
        <p>gia ${VND.format(loc[i].price)}</p>
        <button onclick="buy(${loc[i].id})">mua</button>
      </div>
   
        `;
  }
  listOrder.innerHTML = text;
}
render(arrListItem);

// function  mua hang
/* 
các bước làm khi  đi  chợ ,  mua hàng

b1 Lấy giỏ hàng

dựa  vào curentUser lưu  trên  local 

b2 lấy sản phẩm dựa vào id sản phẩm

b3  kiểm tra xem sản phẩm có trong giỏ hàng hay không
     +  có rồi tăng số lượng sản phẩm lên
     +  chưa có thì cho  vào giỏ

b4 



*/
function buy(id) {
  if (currentUser == null) {
    window.location.href = "login.html";
  }

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
            // clone lại  product
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
  resultOrder();
}

/* 
  hướng làm hiện thị total- order

  b1 lấy giỏ hàng của người đăng  nhập  ra dựa  vào currentUser

  b2 Hiện thị  innerHTML

*/
let totalOrder = document.getElementById("total-order");
function change() {
  window.location.href = "cartOrder.html";
}
function resultOrder() {
  let users = JSON.parse(localStorage.getItem("users"));
  for (let i = 0; i < users.length; i++) {
    if (users[i].userName == currentUser) {
      totalOrder.innerHTML = users[i].cart.length;
      break;
    }
  }
}
//
// let flag1 = 1;
// let flag2 = 1;
// function descending() {
//   // clone lại arrListItem vào mảng mới tên là arr
//   let arr = [...arrListItem];
//   // .sort để sắp xếp theo  yêu cầu (chỗ này từ lớn xuống bé)
//   arr.sort((a, b) => {
//     return -a.price + b.price;
//   });
//   // tăng biến kiếm tra lên  1
//   flag1++;
//   flag2 = 1;
//   // nếu bằng 2 thì ta render lại  theo  arr (ở dòng 186) và gán lại  giá trị bằng 0
//   if (flag1 == 2) {
//     flag1 = 0;
//     render(arr);
//   } else {
//     if (flag2 == 0) {
//       render(arr);
//     } else {
//       render(arrListItem);
//     }
//   }
// }
// function ascending() {
//   let arr1 = [...arrListItem];
//   arr1.sort((a, b) => {
//     return a.price - b.price;
//   });
//   flag2++;
//   flag1 = 1;
//   if (flag2 == 2) {
//     flag2 = 0;
//     render(arr1);
//   } else {
//     if (flag1 == 0) {
//       render(arr1);
//     } else {
//       render(arrListItem);
//     }
//   }
//}

//  cách của thầy An 
let flag = "normal";
function descending() {
  let arr = [...arrListItem];
  if (flag == "normal" || flag == "ascen") {
    arr.sort((a, b) => {
      return b.price - a.price;
    });
    flag = "descen";
    render(arr);
  } else {
    render(arrListItem);
    flag = "normal";
  }
}

function ascending() {
  let arr = [...arrListItem];
  if (flag == "normal" || flag == "descen") {
    arr.sort((a, b) => {
      return a.price - b.price;
    });
    flag = "ascen";
    render(arr);
  } else {
    render(arrListItem);
    flag = "normal";
  }
}
function search() {
  let searchValue = document.getElementById("searchItem").value;
  let searchArr = arrListItem.filter((item) => {
    return item.name.includes(searchValue);
  });
  console.log(searchValue);
  render(searchArr);
}
