const toFurigana = async (session, word) => {
  while (true) {
    try {
      const phonetic = await session.prompt(`write the IPA transcription of the word: "${word}"`);
      return phonetic;
    } catch {}
  }
}

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(async message => {
    if ((this.ai) && ((await this.ai.canCreateTextSession()) === 'readily')) {
      const session = await this.ai.createTextSession({temperature: 0.1, topK: 1});
      const tokens = message.split(" ");
      let results = [];
      for (let token of tokens) {
        const result = await toFurigana(session, token);
        results.push([token, result.trim()]);
      }
      port.postMessage(results);
    }
  });
});
