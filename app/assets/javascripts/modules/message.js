$(function(){
  function buildHTML(message){
    if (message.image){
      let html =
        `<div class="chat-main__message-list__messageBox" data-message-id=${message.id}>
          <div class="chat-main__message-list__messageBox__messageInfo">
            <div class="chat-main__message-list__messageBox__messageInfo__userName">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__messageBox__messageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__messageBox__message">
            <p class="chat-main__message-list__messageBox__message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="chat-main__message-list__messageBox" data-message-id=${message.id}>
          <div class="chat-main__message-list__messageBox__messageInfo">
            <div class="chat-main__message-list__messageBox__messageInfo__userName">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__messageBox__messageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__messageBox__message">
            <p class="chat-main__message-list__messageBox__message__content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
    };
  }

  $('.chat-main__message-form-newMessage').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);      
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__message-form-newMessage-submitBtn').prop('disabled', false);
    })
    .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });

});