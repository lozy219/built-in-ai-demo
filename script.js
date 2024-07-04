let port;

const updateTitle = message => {
  const el = document.getElementById('firstHeading');
  el.innerHTML = "";
  for (let token of message) {
    el.innerHTML += `<ruby>${token[0]}<rp>(</rp><rt>${token[1]}</rt><rp>)</rp></ruby> `;
  }
}

window.addEventListener('pageshow', event => {
  port = chrome.runtime.connect();
  port.onMessage.addListener(updateTitle);
  port.postMessage(document.getElementById('firstHeading').textContent);
});
