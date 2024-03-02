let postID = localStorage.getItem("postId");
let token = localStorage.getItem("token");
let comments = document.getElementById("comments");
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
function getComments() {
  comments.innerHTML = "";
  axios.get(`https://tarmeezacademy.com/api/v1/posts/${postID}`).then((res) => {
    console.log(res.data.data.body);
    const data = res.data.data;
    let authorName = data.author.name;
    let profileImg = data.author.profile_image;
    let image = data.image;
    let created_at = data.created_at;
    let title = data.title;
    let body = data.body;
    let postid = data.id;
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
      <div>
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
      (${data.comments_count})comments</div>
    </div>
  </div>
</div>
  `;
    console.log(res.data);
    posts.innerHTML = content;
    let comments2 = data.comments;
    if (comments2.length == 0) {
      comments.innerHTML += "<h6> - no comments</h6>";
    } else {
      const comment_title = document.getElementById("comment-title");
      for (item of comments2) {
        console.log(item);
        const com_content = `
        <div class="d-flex flex-column gap-1 pb-1" style="border-bottom: 1px solid #e4e1e1;">
          <div class="com-header">
          <img class="profileImg" src=${item.author.profile_image} alt="" />
          <p style="font-size:15px;font-weight: bold;">@${item.author.name}</p>
          <p style="font-size:9px">${item.author.created_at}</p>
          </div>
          <div class="com-body" style="font-size: 16px;">- ${item.body}</div>
       </div>
        `;
        comments.innerHTML += com_content;
        comment_title.innerText = "Comments:";
      }
    }
    comments.innerHTML += `<div style="display:flex;align-items:center;gap:2px">
    <input class="com-input" id="com-input" type="text" placeholder="your comment...">
    <svg onclick="addComment()" class="com-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
   </svg>
    </div>`;
  });
}
getComments();
function addComment() {
  if (token != null) {
    const com_input = document.getElementById("com-input").value;
    let params = {
      body: com_input,
    };
    axios
      .post(
        `https://tarmeezacademy.com/api/v1/posts/${postID}/comments`,
        params,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getComments();
        appendAlert("تم اضافه التعليق بنجاح", "primary");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  } else {
    appendAlert(
      "You must login! !<a href='#'onclick='x()''> login here.</a>",
      "danger"
    );
  }
}

let image = localStorage.getItem("image");
const navComImgProfile = document.getElementById("nav_imgProfile");
if (image != null) {
  navComImgProfile.src = image;
} else {
  navComImgProfile.src = "";
}
