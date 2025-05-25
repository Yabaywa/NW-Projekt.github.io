document.addEventListener('DOMContentLoaded', () => {
  const postInput = document.getElementById('postInput');
  const postButton = document.getElementById('postButton');
  const postsDiv = document.getElementById('posts');
  const loggedInUserSpan = document.getElementById('loggedInUser');
  const logoutButton = document.getElementById('logoutButton');

  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = '../Login/Login-Main.html';
    return;
  }
  const [username, , role] = JSON.parse(currentUser);
  loggedInUserSpan.textContent = username;
  if (username.toLowerCase() === 'yannek' && role === 'admin') {
    loggedInUserSpan.classList.add('admin-name');
  }

  let posts = JSON.parse(localStorage.getItem('posts')) || [];

  function filterContent(content) {
    const badWords = ['schimpfwort', 'hass', 'beleidigung'];
    let filtered = content;
    badWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      filtered = filtered.replace(regex, '#'.repeat(word.length));
    });
    return filtered;
  }

  function loadPosts() {
    postsDiv.innerHTML = '';
    posts.forEach((post, index) => {
      const postElement = document.createElement('div');
      postElement.className = `post ${role === 'admin' ? 'admin' : ''}`;
      const isAdminPost = post.user.toLowerCase() === 'yannek' && role === 'admin';
      postElement.innerHTML = `
        <div class="post-header">
          <strong class="${isAdminPost ? 'admin-name' : ''}">${post.user}</strong> (${post.timestamp})
          ${role === 'admin' ? `<button class="delete-button" data-index="${index}">Löschen</button>` : ''}
        </div>
        <p class="post-content">${post.content}</p>
        <div class="post-actions">
          <button class="reply-button" data-index="${index}">Antworten</button>
          <button class="like-button" data-index="${index}"><i class="fas fa-thumbs-up"></i> ${post.likes || 0}</button>
          <button class="dislike-button" data-index="${index}"><i class="fas fa-thumbs-down"></i> ${post.dislikes || 0}</button>
        </div>
        <div class="reply-section" data-index="${index}" style="display: none;">
          <textarea class="reply-input" placeholder="Schreibe deine Antwort hier..."></textarea>
          <button class="submit-reply-button" data-index="${index}">Absenden</button>
        </div>
        <div class="replies" data-index="${index}"></div>
      `;
      postsDiv.appendChild(postElement);

      post.replies?.forEach(reply => {
        const replyElement = document.createElement('div');
        replyElement.className = 'reply';
        const isAdminReply = reply.user.toLowerCase() === 'yannek' && role === 'admin';
        replyElement.innerHTML = `
          <div class="reply-header">
            <strong class="${isAdminReply ? 'admin-name' : ''}">${reply.user}</strong> (${reply.timestamp})
          </div>
          <p class="reply-content">${reply.content}</p>
          <div class="reply-actions">
            <button class="like-button" data-index="${index}" data-reply-index="${reply.id}"><i class="fas fa-thumbs-up"></i> ${reply.likes || 0}</button>
            <button class="dislike-button" data-index="${index}" data-reply-index="${reply.id}"><i class="fas fa-thumbs-down"></i> ${reply.dislikes || 0}</button>
          </div>
        `;
        postElement.querySelector(`.replies[data-index="${index}"]`).appendChild(replyElement);
      });
    });
  }

  postButton.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (content) { // Entferne die role === 'member'-Bedingung
      const filteredContent = filterContent(content);
      const post = {
        user: username,
        content: filteredContent,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        dislikes: 0,
        replies: []
      };
      posts.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));
      postInput.value = '';
      loadPosts();
    }
  });

  postsDiv.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('reply-button')) {
      const replySection = postsDiv.querySelector(`.reply-section[data-index="${index}"]`);
      replySection.style.display = replySection.style.display === 'block' ? 'none' : 'block';
    } else if (e.target.classList.contains('submit-reply-button')) {
      const replyInput = postsDiv.querySelector(`.reply-section[data-index="${index}"] .reply-input`);
      const replyContent = replyInput.value.trim();
      if (replyContent) {
        const filteredReply = filterContent(replyContent);
        const reply = {
          user: username,
          content: filteredReply,
          timestamp: new Date().toLocaleString(),
          likes: 0,
          dislikes: 0,
          id: Date.now()
        };
        posts[index].replies.push(reply);
        localStorage.setItem('posts', JSON.stringify(posts));
        replyInput.value = '';
        replySection.style.display = 'none';
        loadPosts();
      }
    } else if (e.target.classList.contains('like-button')) {
      const replyIndex = e.target.dataset.replyIndex;
      if (replyIndex) {
        posts[index].replies.find(r => r.id == replyIndex).likes++;
      } else {
        posts[index].likes++;
      }
      localStorage.setItem('posts', JSON.stringify(posts));
      loadPosts();
    } else if (e.target.classList.contains('dislike-button')) {
      const replyIndex = e.target.dataset.replyIndex;
      if (replyIndex) {
        posts[index].replies.find(r => r.id == replyIndex).dislikes++;
      } else {
        posts[index].dislikes++;
      }
      localStorage.setItem('posts', JSON.stringify(posts));
      loadPosts();
    } else if (e.target.classList.contains('delete-button') && role === 'admin') {
      posts.splice(index, 1);
      localStorage.setItem('posts', JSON.stringify(posts));
      loadPosts();
    }
  });

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
  });

  loadPosts();
});