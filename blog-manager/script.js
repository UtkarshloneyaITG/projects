console.log('js running')
RenderBlogs()
let blogs = []

async function Fetchdata() {
  let loader = document.querySelector('.loader-container')
  loader.style.display = 'flex'
  try {
    let response = await fetch('https://ewl-server.vercel.app/api/v1/blog/all')
    let data = await response.json()
    loader.style.display = 'none'
    blogs = data.blogs
  } catch (error) {
    console.log('error')
  }
}

async function deleteData(Delete) {
  let loader = document.querySelector('.loader-container')
  loader.style.display = 'flex'
  try {
    let response = await fetch('https://ewl-server.vercel.app/api/v1/blog/deleteById', Delete)
    location.reload()
  } catch (error) {
    console.log('error')
  }
}

async function CreatePostFetch(data) {
  let loader = document.querySelector('.loader-container')
  loader.style.display = 'flex'
  try {
    let response = await fetch(' https://ewl-server.vercel.app/api/v1/blog/create', data)
    location.reload()
  } catch (error) {
    console.log('error line no. 29')
  }
}


async function RenderBlogs() {
  await Fetchdata()
  let container = document.querySelector('.article-container')

  blogs.reverse().forEach((element, index) => {
    let blogDiv = document.createElement('div')
    let id = element._id
    blogDiv.setAttribute('class', 'article')
    blogDiv.innerHTML = `
          <h3>${element.title}</h3>
          <p>Posted on ${element.createdAt.slice(0, 10)} by ${element.author}</p>
          <p>${element.content}</p>
          <button onclick='deleteBlog("${id}")'>Delete</button onclick="editBlog('${id}')"><button>Edit</button>`
    container.appendChild(blogDiv)
  });
}

function deleteBlog(id) {
  let Delete = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'id': id })
  }
  deleteData(Delete)
}

function toggleHome() {
  let home = document.querySelector('.recent-posts')
  let newPost = document.querySelector('.create-post-section')

  home.style.display = 'block'
  newPost.style.display = 'none'

}
function toggleNewPost() {
  let home = document.querySelector('.recent-posts')
  let newPost = document.querySelector('.create-post-section')

  home.style.display = 'none'
  newPost.style.display = 'block'

}

async function createPost() {
  let name = document.getElementById('name').value
  let title = document.getElementById('title').value
  let content = document.getElementById('Content').value

  let data = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "title": title,
      "content": content,
      "author": name
    })
  }
  CreatePostFetch(data)
}
function cancel() {
  let name = document.getElementById('name').value = ''
  let title = document.getElementById('title').value = ''
  let content = document.getElementById('Content').value = ''

  toggleHome()
}

// async function 