var click = new Audio('click.mp3');
var bing = new Audio('bing.mp3');
var count = 1;
var stage = 1;

function tick() {
  setTimeout(function () {
    if (count % 40 < 30 && count % 40 > 0) {
      click.play();
    } else if (count % 40 == 30) {
      document.querySelector('.stage-' + stage + ' .timer').classList.toggle('off')
      document.querySelector('.stage-' + stage + ' .rest').classList.toggle('on')
      bing.play();
    } else if (count % 40 == 0) {
      document.querySelector('.stage-' + stage + ' .rest').classList.toggle('on')
      document.querySelector('.stage-' + stage + ' .done').classList.toggle('on')
      stage++;
    }
    count++;
    tick();
  }, 1000);
}

document.querySelector('.mute').addEventListener('click', function() {
  click.volume = click.volume == 1 ? 0 : 1;
  bing.volume = bing.volume == 1 ? 0 : 1;
  this.classList.toggle('fa-volume-up');
  this.classList.toggle('fa-volume-off');
});

tick();
