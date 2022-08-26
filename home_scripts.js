function logOut() {
  if ("token" in localStorage) {
    localStorage.removeItem("token")
    window.location.href = "index.html"
  }
}

var token = ``
if ('token' in localStorage) {
  token = localStorage.getItem('token')
}
var options = {
  method: "GET",
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: 'Token ' + token
  },

}
fetch(`http://127.0.0.1:8000/api/v1/posts`, options)
  .then(res => res.json())
  .then(data => {
    populatePosts(data)
  })

function populatePosts(posts) {
  let htmlData = ``
  posts.forEach(post => {
    htmlData += `<div class="card mt-5 mb-5" style="width: 70%;" >
        <p class="card-text ">${post.user}</p>
        <img src="${post.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-text">${post.content}</p>
          <p class="card-text">${post.post_date}</p>
          <button class="btn btn-outline-primary" name="${post.id}" onclick=" postDetails(event)">View</button>
        </div>
      </div>


        `
  })
  id_posts.innerHTML = htmlData
}
function postDetails(event) {
  let postId = event.target.name
  fetch(`http://127.0.0.1:8000/api/v1/posts/${postId}/`, options)
    .then(res => res.json())
    .then(data =>

      postDisplay(data)
    )
}
function postDisplay(post) {

  let modelDiv = document.createElement('div')
  modelDiv.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" style="max-width: 850px;">
        <div class="modal-content">
        <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="margin-left: auto;"></button>
          
          <div class="modal-body">
          <div class="card mb-1" style="max-width: 840px;">
          <div class="row g-0">
            <div class="col-md-6">
              <img src="${post.image}" class="img-fluid rounded-start" alt="no">
            </div>
            <div class="col-md-6">
              <div class="card-body">
            <h4 class="modal-title" style=" font-family: cursive;;" >${post.user}</h4>
                    <hr>
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.content}</p>
                <p class="card-text"><small class="text-muted">${post.post_date}</small></p>
              </div>
            </div>
          </div>
        </div>
          </div>
          <div class="modal-footer">
            
          </div>
        </div>
      </div>
    </div>
    
    `
  document.body.append(modelDiv)

  var modal = new bootstrap.Modal(modelDiv.querySelector("#postModal"))
  modal.show()
}

function addPostModal() {

  let modelDiv = document.createElement('div')
  modelDiv.innerHTML = `
  <!-- Modal -->
      <div class="modal" id="add_post_modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
      <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title">ADD POST</h5>
      </div>
      <div class="modal-body">
    <!-- form -->
          <div class="form-group">
          <label for="" class="mt-2">Post Title</label>
          <input type="text" class="form-control mt-2" id="id_post_title" aria-describedby="review" placeholder="Post Title">
          </div>
          <div class="form-group">
          <label for="" class="mt-2">Post content</label>
          <input type="text" class="form-control mt-2" id="id_post_content" aria-describedby="" placeholder="Post content">
          </div>
          
          <button type="submit" class=" mt-4 btn btn-primary" name="" onclick="submitPost()">Submit</button>
      
                  </div>
              </div>
          </div>
      </div>
  `
  document.body.append(modelDiv)

  var modal = new bootstrap.Modal(modelDiv.querySelector("#add_post_modal"))
  modal.show()
}
function submitPost() {
  let postTitle = id_post_title.value
  let postContent = id_post_content.value
  let data = {
    "title": postTitle,
    "content": postContent,
  }
  let opn = {
    method: "POST",
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: 'Token ' + token
    },
    body: JSON.stringify(data),


  }

  fetch(`http://127.0.0.1:8000/api/v1/posts/`, opn)
    .then(res => res.json())
    .then(data => {
      let modelWindow = new bootstrap.Modal(document.querySelector('#add_post_modal'))
      modelWindow.hide()
      document.querySelector('#msg_box').innerHTML = "Post Added Successfully"
    })
}

function viewProfile() {

  fetch(`http://127.0.0.1:8000/api/v1/users/account/profile`, options)
    .then(res => res.json())
    .then(data => {
      populateProfileData(data)
    })
}
function populateProfileData(profileData) {
  let modelDiv = document.createElement('div')
  modelDiv.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${profileData.user}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <div class="card" style="width: 100%">
          <img src="" class="card-img-top" alt="no img">
          <div class="card-body">
            <h6 class="card-text">${profileData.bio}</h6>
            <p class="card-title"> ${profileData.phone}</p>
            
          </div>
        </div>
          </div>
          <div class="modal-footer">
            
          </div>
        </div>
      </div>
    </div>
    
    `
  document.body.append(modelDiv)

  var modal = new bootstrap.Modal(modelDiv.querySelector("#exampleModal"))
  modal.show()
}