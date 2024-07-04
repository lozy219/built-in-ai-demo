let port;

const updateTitle = message => {
  const el = document.getElementById('firstHeading');
  el.innerHTML = "";
  for (let [token, phonetic] of message) {
    el.innerHTML += `<ruby>${token}<rp>(</rp><rt>${phonetic}</rt><rp>)</rp></ruby> `;
  }
}

window.addEventListener('pageshow', event => {
  port = chrome.runtime.connect();
  port.onMessage.addListener(updateTitle);
  port.postMessage(document.getElementById('firstHeading').textContent);
});
