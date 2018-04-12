
// Editor de preguntas

var simplemde = new SimpleMDE({
  element: document.getElementById("posts[title]"),
  autosave: {
	  enabled: true,
		uniqueId: "posts[title]",
		delay: 1000,
	},
  toolbar: ["bold", "italic", "|", "quote", "link", "|", "preview", "guide"],
  placeholder: "Haz una pregunta!\nTu pregunta será pública en Github antes de ser respondida.",
  spellChecker: false,
  shortcuts: {"toggleFullScreen": null},
  status: false
})

// Autolink (modified from /bryanwoods/autolink-js)
String.prototype['autoLink'] = function() {
  var pattern = /(^|[\s\n]|\(|<[A-Za-z]*\/?>)(?:https?|ftp):\/\/([\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.]*[\-A-Z0-9+\u0026@#\/%=~(_|])/gi
  return this.replace(pattern, "$1<a href='$2$3'>$2</a>")
}
var questions = document.getElementsByClassName("question")
for(q of questions){q.innerHTML = q.innerHTML.autoLink()}
var answers = document.getElementsByClassName("answer")
for(a of answers){a.innerHTML = a.innerHTML.autoLink()}

// Gestión del envío de preguntas

(function ($) {
  $('.question-form').submit(function () {
    var form = this
    $(form).addClass('form-loading')
    $(".send-button").prop( "disabled", true)
    show('Enviando...', "inherit")

    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        show('Enviado ✓', "#158100", 3000)
	console.log(data)
        simplemde.value("")
        $(".send-button").prop( "disabled", false)
        $(form).removeClass('form-loading')
      },
      error: function (err) {
        console.log(err)
        show('Error 🞬',"#cb0000", 3000)
        $(".send-button").prop( "disabled", false)
        $(form).removeClass('form-loading')
      }
    })
    return false
  })

  function show(title, color, delay) {
    $('.form-status').css("color", color)
    $('.form-status').text(title)
    if(delay === undefined)
      $('.form-status').show()
    else{
      $('.form-status').show().delay(delay).fadeOut()
    }
  }
})(jQuery)
