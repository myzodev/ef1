const createNewComment = (appendTo, comment) => {
    const li = document.createElement('li');
    li.className = 'py-24 last:pb-0 border-t first:border-t-0 border-neutral-40';

    li.innerHTML = `
        <div class="mb-8 flex justify-between items-center">
            <div class="gap-8 flex items-center">
                <figure class="size-40 flex justify-center items-center shrink-0 rounded-full overflow-hidden bg-neutral-30">
                    ${
                        comment.user.avatar
                            ? `<img class="object-cover" src="${comment.user.avatar}" alt="Profile picture">`
                            : `<img class="size-24" src="/images/icons/user.svg" alt="User icon">`
                    }
                </figure>
                <p class="font-semibold">
                    ${comment.user.name}
                </p>
            </div>

            <button class="comment-delete-button button button-xs button-error" type="button" data-comment-id="${comment.id}">Delete comment</button>
        </div>

        <p>${comment.text}</p>
    `;

    appendTo.appendChild(li);
}

const handleDeleteClick = async (event) => {
    event.preventDefault()

    const button = event.currentTarget
    const commentId = button.dataset.commentId

    const response = await fetch(`http://localhost:3000/comment/${commentId}/delete`, {
        method: 'POST',
    })

    if (!response.ok) {
        console.error('Error deleting comment:', response.statusText)
        return
    }

    const commentItem = button.closest('li')

    if (commentItem) {
        commentItem.remove()
    }

    const commentsCounter = document.querySelector('.comments-counter')

    if (commentsCounter) {
        const count = parseInt(commentsCounter.textContent, 10)
        commentsCounter.textContent = count - 1
    }
}

const commentAjax = () => {
    const commentForm = document.getElementById('comment-form')
    const commentsList = document.getElementById('comments-list')

    if (!commentForm || !commentsList) return

    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const formData = new FormData(commentForm)
        const formDataJSON = Object.fromEntries(formData.entries())

        const response = await fetch('http://localhost:3000/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataJSON),
        })

        const data = await response.json()

        createNewComment(commentsList, data)

        const newButton = commentsList.querySelector(`.comment-delete-button[data-comment-id="${data.id}"]`)

        if (newButton) {
            newButton.addEventListener('click', handleDeleteClick)
        }

        const commentsCounter = document.querySelector('.comments-counter')

        if (commentsCounter) {
            const count = parseInt(commentsCounter.textContent, 10)
            commentsCounter.textContent = count + 1
        }

        commentForm.reset()
    })

    const commentDeleteButtons = document.querySelectorAll('.comment-delete-button')

    commentDeleteButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteClick)
    })
}

export default commentAjax