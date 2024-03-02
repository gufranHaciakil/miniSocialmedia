function getPosts() {
  axios.get("https://tarmeezacademy.com/api/v1/posts?limit=10").then((res) => {
    let posts = document.getElementById("posts");
    let data = res.data.data;
    for (item of data) {
      let authorName = item.author.name;
      let profileImg = item.author.profile_image;
      let image = item.image;
      let created_at = item.created_at;
      let title = item.title;
      let body = item.body;
      let content = `
        <div class="card mb-4 shadow-sm">
        <div class="card-header">
          <img
            src=${profileImg}
            alt=""
            width="45px"
            class="rounded-circle border border-3"
          />
          <b>@${authorName}</b>
        </div>
        <div class="card-body">
          <div class="text-center">
            <img
            src="${image}"
              alt=""
              width="450px"
              class="img-fluid rounded"
            />
          </div>
          <h5 class="card-title">
            <p style="font-size: 10px; color: rgb(201, 201, 201)">
                 ${created_at} </p>
                 ${title}
            
          </h5>
          <p class="card-text">
            ${body}
            content.
          </p>
          <hr />
          <div>
            <a href="comments.html" onclick="getPostId(${item.id})">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
            />
          </svg>
            (${item.comments_count})comments</a>
          </div>
        </div>
      </div>
        `;
      // console.log(item)
      posts.innerHTML += content;
    }
    console.log(res);
  });
}
getPosts();
function setupUi() {
  if (localStorage.getItem("token") != null) {
    const authDiv = document.getElementById("authDiv");
    const addPost = document.getElementById("addPost");
    let image = localStorage.getItem("image");
    let name = localStorage.getItem("name");
    authDiv.innerHTML = `
    <p style="position: relative;top: 4px;right: 5px;">${name}</p>
    <img src=${image} width="40px" height="40px" style="border-radius: 100%;" alt="">
    <button
    onclick="logout()"
    type="button"
    class="btn btn-outline-danger">
    Logout
    </button>
    `;
    addPost.innerHTML = `
    <button style="border:none;background: none;">
     <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-lg " style="background-color: #bfbfbf;border-radius: 7px;padding: 4px;width: 4rem;height: 50px;" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
     </svg>
    </button>
   `;
  } else {
    authDiv.innerHTML = `
         <button
          type="button"
          class="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#loginModal">
          Login
        </button>
        <button type="button" class="btn btn-outline-success"
        data-bs-toggle="modal"
        data-bs-target="#registerModal">
          Sign in
        </button>        
    `;
    addPost.innerHTML = "";
  }
}
setupUi();
const appendAlert = (message, type) => {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div style="font-weight:bold;">${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};

function loginButton() {
  const username = document.getElementById("username_input").value;
  const password = document.getElementById("password_input").value;
  let params = {
    username: username,
    password: password,
  };
  axios.post("https://tarmeezacademy.com/api/v1/login", params).then((res) => {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.user.name);
    localStorage.setItem("image", res.data.user.profile_image);
    const modal = document.getElementById("loginModal");
    const instanceModal = bootstrap.Modal.getInstance(modal);
    instanceModal.hide();
    setTimeout(() => {
      appendAlert("logged successfully", "success");
    }, 600);
    setTimeout(() => {
      appendAlert("Welcome " + localStorage.getItem("name"), "success");
    }, 800);
    setTimeout(() => {
      const alert = bootstrap.Alert.getOrCreateInstance(
        "#liveAlertPlaceholder"
      );
      // todo:
      // alert.close();
    }, 2000);
    setupUi();
    console.log(res.data.user);
  });
}
function registerBtn() {
  const name = document.getElementById("reg_name_input").value;
  const username = document.getElementById("reg_username_input").value;
  const password = document.getElementById("reg_password_input").value;
  const email = document.getElementById("reg_email_input").value;
  const image = document.getElementById("reg_img_input").files[0];

  let formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("image", image);
  axios
    .post("https://tarmeezacademy.com/api/v1/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("image", res.data.user.profile_image);
      console.log(res.data.user);
      const modal = document.getElementById("registerModal");
      const instanceModal = bootstrap.Modal.getInstance(modal);
      instanceModal.hide();
      setTimeout(() => {
        appendAlert("Register successfully", "success");
      }, 600);
      setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(
          "#liveAlertPlaceholder"
        );
        // todo:
        // alert.close();
      }, 2000);
      setupUi();
      console.log(res.data);
    })
    .catch((error) => {
      let errorMsg = error.response.data.message;
      let errorMsg2 = error.response.data.errors.email;
      appendAlert(errorMsg, "danger");
      appendAlert(errorMsg2, "danger");
    });
}

function addPostBtnClicked() {
  const title = document.getElementById("title_input").value;
  const body = document.getElementById("body_input").value;
  const image = document.getElementById("img_input").files[0];
  let token = localStorage.getItem("token");
  let formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("image", image);

  axios
    .post("https://tarmeezacademy.com/api/v1/posts", formData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      getPosts();
      console.log(res);
      const modal = document.getElementById("addPostModal");
      const instanceModal = bootstrap.Modal.getInstance(modal);
      instanceModal.hide();
      setTimeout(() => {
        appendAlert("Added Post successfully", "success");
      }, 600);

      // setTimeout(() => {
      //   const alert = bootstrap.Alert.getOrCreateInstance(
      //     "#liveAlertPlaceholder"
      //   );
      //   // todo:
      //   // alert.close();
      // }, 2000);
    })
    .catch((error) => {
      let errorMsg = error.response.data.message;
      appendAlert(errorMsg, "danger");
      console.log(error);
    });
}
function getPostId(id) {
  localStorage.setItem("postId", id);
  console.log(id);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("image");
  appendAlert("Logout Successfully", "primary");
  setupUi();
}
